import "survey-core/survey-core.css";
import styles from "./Wizard.module.css";

import React, { JSX } from "react";
import { Model, Serializer, PageModel } from "survey-core";
import { Survey } from "survey-react-ui";
import { SolidDarkPanelless as Theme } from "survey-core/themes";
// Extend TypeScript interface for PageModel
declare module "survey-core" {
  interface PageModel {
    redirect?: string;
  }
}

// Extend the PageModel to support custom 'redirect' property
Serializer.addProperty("page", {
  name: "redirect:string",
  default: "",
});

interface WizardProps {
  model: Model;
}

export default function Wizard({ model }: WizardProps): JSX.Element {
  model.applyTheme(Theme);
  model.onCurrentPageChanged.add((sender, options) => {
    if (options.newCurrentPage?.redirect) {
      window.location.replace(options.newCurrentPage?.redirect);
    }
  });
  return (
    <div className={styles.wizard}>
      <Survey model={model} />
    </div>
  );
}
