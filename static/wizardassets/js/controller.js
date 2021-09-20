/*
The MIT License (MIT)

Copyright (c) DistroKid

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

function initSystem(specificDataSet) {
  // begin: did we specify a data file?
    if (specificDataSet) {
      dataset = specificDataSet
    } else if (getUrlVars().dataset) {
      dataset = getUrlVars().dataset;
    } else {
      dataset = "default";
    }
  // end: did we specify a data file?

  // begin: what is the full path to the site? (for testing locally)
  if (getUrlVars().localhost) {
    var protocol = getUrlVars().localhost.split("/")[0];
    if (protocol == "http:" && location.protocol == "https:") {
      fullPath = "";
      swal.fire(
        "Localhost issue",
        "Remote host is https but localhost is http. Your browser won't allow http to load on an https site. So we're loading data from the remote host instead.",
        "error"
      );
    } else {
      fullPath = getUrlVars().localhost; //e.g. http://localhost:8000/
    }
  } else {
    fullPath = "";
  }
  // what is the full path to the site?

  // begin: did we specify a data file?
  if (getUrlVars().language) {
    language = getUrlVars().language;
  } else {
    language = navigator.language || navigator.userLanguage;
    language = language.split("-")[0];
  }
  // end: did we specify a data file?

  $j(".pageGoesHere").html(showSpinner());

  // are we testing stuff?
  testModePages = false;
  if (
    getUrlVars().test &&
    localStorage.getItem("pud_was_here") &&
    localStorage.getItem("testJsonPages")
  ) {
    if (getUrlVars().test == localStorage.getItem("pud_was_here")) {
      testModePages = true;
    } else {
      swal.fire(
        "Test Mode Failed",
        "You entered a test URL, but incorrect sessionId. So we're showing you regular data instead of test data.",
        "error"
      );
    }
  }

  if (testModePages) {
    data = JSON.parse(localStorage.getItem("testJsonPages"));
    $j(document).ready(function () {
      swal.fire(
        "Test Mode",
        "This isn't real data. It's for developer purposes only.",
        "success"
      );
      $j(".headerTestMode").show();
    });
    initSystem2();
  } else {
    var myGet = $j.getJSON(
      fullPath + "/wizardassets/data/" + dataset + "_pages.json?cachebuster=" + uuid(),
      function (response) {
        data = response;
        initSystem2();
      }
    );
    myGet.fail(function () {
      $j(".pageGoesHere").html(
        "We had a problem loading the data (or the data file isn't valid JSON).<br><br>Please try again."
      );
    });
  }
}

function initSystem2() {
  testMode = false;
  if (
    getUrlVars().test &&
    localStorage.getItem("pud_was_here") &&
    localStorage.getItem("testJson")
  ) {
    if (getUrlVars().test == localStorage.getItem("pud_was_here")) {
      testMode = true;
    } else {
      swal.fire(
        "Test Mode Failed",
        "You entered a test URL, but incorrect sessionId. So we're showing you regular data instead of test data.",
        "error"
      );
    }
  }

  // begin: test or real?
  if (testMode) {
    flow = JSON.parse(localStorage.getItem("testJson"));
    $j(document).ready(function () {
      swal.fire(
        "Test Mode",
        "This isn't real data. It's for developer purposes only.",
        "success"
      );
      $j(".headerTestMode").show();
    });
    initSystem3();
  } else {
    var myGet = $j.getJSON(
      fullPath + "/wizardassets/data/" + dataset + "_flow.json?cachebuster=" + uuid(),
      function (response) {
        flow = response;
        initSystem3();
      }
    );
  }
  // end: test or real?
}

function initSystem3() {
  var myGet = $j.getJSON(
    fullPath + "/wizardassets/data/" + dataset + "_flow.json?cachebuster=" + uuid(),
    function (response) {
      // begin: init history (for back button)
      timelineArray = [];
      pathArray = [];
      // end: init history (for back button)

      // begin: set page language
      $j("html").attr("lang", language);
      // end: set page language

      // begin: what's the root page to show?
      showPage(dataset, flow[0], language);
      // end: what's the root page to show?

      // begin: button listener
      $j(document).on("click", ".nextButton", function (e) {
        controller(this);
      });

      $j(document).on("click", ".answer", function (e) {
        controller(this);
      });


      $j(document).on("click", ".restartButton", function (e) {
        restart();
      });
      // end: button listener

    }
  );
  myGet.fail(function () {
    $j(".pageGoesHere").html(
      "We had a problem loading the flow (or the flow file isn't valid JSON).<br><br>Please try again."
    );
  });
}

function ifLanguageExists(obj, preferredLanguage) {
  var returnString = "";
  if (obj[preferredLanguage]) {
    returnString = obj[preferredLanguage];
  } else {
    returnString = obj[data.defaultLanguage];
  }

  // begin: handle missing content
  if (typeof returnString == "undefined") {
    returnString = "";
  }
  // end: handle missing content

  return returnString;
}

function showPage(dataset, newTimeline, language) {
  // ex: showPage('default','baby','en')
  name = newTimeline.name;
  var page = data.content.pages[name];

  try {
	// Test if this is a real URL and then navigate to it
	// if it is.
	const parsedURL = new URL(name);
	if (parsedURL && parsedURL.protocol === 'https:') {
    if (parsedURL.host == 'owncast.online') {
      console.log(parsedURL)
      window.open(parsedURL.pathname);
      return;
    }
    window.open(parsedURL.toString());
		return;
	}
  } catch(e) {}
  

  // begin: for developers (or otherwise curious users)
  pathArray.push(name);
  debug(pathArray.join("/"));
  // begin: /for developers (or otherwise curious users)

  // begin: check page exists
  if (typeof page == "undefined") {
    timelineArray.pop();
    pathArray.splice(0, 3);
    $j(".spinner").hide();
    swal.fire("", "Missing page: " + name, "error");
    return false;
  } else {
    document.newTimeline = newTimeline;
  }
  // end: check page exists

  // begin: set some global vars
  document.dataset = dataset;
  document.name = name;
  document.language = language;
  // end: set some global vars

  // begin: build template
  var template = $j(".template").text();
  template = template.replace(/\[dataset\]/gi, dataset);
  template = template.replace(/\[name\]/gi, name);
  template = template.replace(/\[language\]/gi, language);
  template = template.replace(
    /\[title\]/gi,
    ifLanguageExists(page.title, language)
  );
  template = template.replace(
    /\[instructions\]/gi,
    ifLanguageExists(page.instructions, language)
  );
  // end: build template

  // begin: draw html
  $j(".pageGoesHere").html(template);
  // end: draw html

  // begin: add choices Array(11).join("a")
  // choiceBlock = $j('.pageGoesHere').find('.choices').html().repeat(page.choices.length); // doesn't work in IE
  choiceBlock = $j(".pageGoesHere").find(".choices").html(); // repeat choices as many times as needed
  choiceBlock = Array(page.choices.length + 1).join(choiceBlock);
  $j(".pageGoesHere").find(".choices").html(choiceBlock);
  // end: add choices

  // begin: if no choices, remove choices
  if (page.choices.length == 0) {
    $j(".nextButton").remove();
  }
  // end: if no choices, remove choices

  // begin: populate choices
  $j(".choice:visible").each(function (count) {
    $j(this)
      .find(".choiceText")
      .text(ifLanguageExists(page.choices[count].text, language));
    $j(this).find("input").attr("value", page.choices[count].value);
    $j(this).find("input").attr("type", page.choices[count].type);
    $j(this).find("input").attr("name", name);
  });
  // end: populate choices

  // begin: set some page text
  $j(".headerText").text(ifLanguageExists(data.content.title, language));
  $j(".nextButton").attr(
    "value",
    ifLanguageExists(data.content.button, language)
  );

  const restartButtonStyle = timelineArray.length > 0 ? 'inline-block' : 'none';
  $j(".restartButton").css('display', restartButtonStyle);

  // end: set some page text

  // begin: prettyficiation width
  // widen();
  // end: prettyficiation width
}

function restart() {
  var previousTimeline = timelineArray[0];
  if (typeof previousTimeline != "undefined") {
    timelineArray.pop();
    pathArray.splice(0, 3);
    showPage(dataset, previousTimeline, language);
  }
  $j(".restartButton").css('display', 'none');
}

function controller() {
  var button = $j('input[type="button"]:visible');
  var dataset = button.parents(".page:visible").attr("dataset");
  var name = button.parents(".page:visible").attr("name");
  var logic = document.newTimeline.children;
  // var isRequired = data.content.pages[name].required;

  // begin: is a selection required?
  // if (isRequired) {
  //   if ($j(".answer:checked:visible").length == 0) {
  //     swal.fire("", "Please make a selection", "error");
  //     return false;
  //   }
  // }
  // end: is a selection required?

  // begin: get sum
  var sum = 0;
  $j(".answer:checked:visible").each(function () {
    var value = $j(this).attr("value");
    if (!isNaN(value)) {
      sum = (sum + value) * 1;
    }
  });
  // end: get sum

  // begin: put this page into browser history
  history.pushState(null, null, null);
  timelineArray.push(document.newTimeline);
  // end: put this page into browser history

  // begin: logic
  var quit = false;

  if (typeof logic == "undefined") {
    swal.fire("", "No subsequent page defined.", "error");
    return false;
  }

  if (logic.length == 0) {
    swal.fire("", "No subsequent page defined.", "error");
    return false;
  }

  $j(logic).each(function () {
    if (this.test == "sum") {
      // match sums of numbers
      var numbersInRange = this.if.toString().split("-").length; // just a number? or a range?

      // begin: turn single numbers (like 2) into a range (like 2-2)
      if (numbersInRange == 1) {
        this.if = this.if.toString() + "-" + this.if.toString();
      }
      // end: turn single numbers (like 2) into a range (like 2-2)

      // begin: get high and low numbers in range
      var low = this.if.split("-")[0];
      var high = this.if.split("-")[1];
      // debug('try if >= ' + low + ' and <= ' + high);
      // end: get high and low numbers in range

      if (sum >= low && sum <= high) {
        // debug('go to: ' + this.children[0].name + ' because sum is: ' + this.if);
        pathArray.push(sum);
        showPage(dataset, this.children[0], language);
        quit = true;
      }
      if (quit) {
        return false;
      }
    } else if (this.test == "string") {
      // match exact strings
      var newPage = this.children[0];
      var newIf = this.if;
      $j(".answer:checked:visible").each(function () {
        var value = $j(this).attr("value");
        if (isNaN(value) && value == newIf) {
          pathArray.push(value);
          showPage(dataset, newPage, language);
          quit = true;
        }
      });
      if (quit) {
        return false;
      }
    } else if (this.test == "else") {
      // else...
      document.elseGoTo = this.children[0];
    }
  });

  if (!quit) {
    // else...
    if (typeof document.elseGoTo !== "undefined" && document.elseGoTo) {
      pathArray.push("else");
      showPage(dataset, document.elseGoTo, language);
    } else {
      swal.fire("", "No matches in the flow for what's next.", "error");
      return false;
    }
  }
  document.elseGoTo = ""; // reset this variable
  // end: logic
}
