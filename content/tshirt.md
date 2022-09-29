---
title: Owncast Contributor T-Shirt
description: We offer t-shirts to people who support the project.
draft: false
---

 <script>
    function getCode() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get('code');
        return code;
    }

    window.onload = function() {
        const code = getCode();
        if (!code) {window.location.href = '/';}

        const s1 = document.getElementById('shirt-1');
        s1.src = `https://owncast.gumroad.com/l/NQjeEn/${code}`;
        document.getElementById('shirt-1-link').href = s1.src;

        const s2 = document.getElementById('shirt-2');
        s2.src = `https://owncast.gumroad.com/l/dUVkj/${code}`;
        document.getElementById('shirt-2-link').href = s2.src;
    };
</script>

<style>
    #embed-container {
        width: 100%;
    }
    .embed {
        border: none;
        margin: 10px;
        width: 50%;
    }

    iframe {
        height: 2500px;
        width: 100%;
    }
</style>

## Thank you!

Thank you for contributing to, supporting, using, and being a part of the Owncast community. As a small token the project would like to offer you a free Owncast t-shirt.

There are two different styles to select from. Please let Gabe know if you have any questions. While he knows nothing about t-shirts he will do his best to help.

Click the direct link if you'd prefer not to use the tiny iframe embed of the shirt design.

### FAQ

- **Do you have to pay anything? Even shipping?** No.
- **Are there any import fees?** Not that I know of. It should get shipped from a facility near you. I haven't heard of anyone having to pay any fees.
- **Who pays for these shirts?** The kind and generous people who have [donated](https://opencollective.com/owncast/donate) to the project.

### Details

- 95% polyester, 5% elastane (fabric composition may vary by 1%)
- Fabric weight: 6.19 oz/yd² (210 g/m²), weight may vary by 5%
- Premium knit mid-weight jersey
- Four-way stretch fabric that stretches and recovers on the cross and lengthwise grains
- Regular fit

<div id="embed-container" style="display: flex; flex-direction: row; justify-content: center">
    <div class="embed">
        <a id="shirt-1-link">Direct link to shirt</a><br/>
        <iframe id="shirt-1" allow="payment"></iframe>
    </div>
    <div class="embed">
        <a id="shirt-2-link">Direct link to shirt</a><br/>
        <iframe id="shirt-2" allow="payment"></iframe>
    </div>
</div>
