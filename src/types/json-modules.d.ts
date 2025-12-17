// Type declarations for JSON imports
declare module "*.json" {
  const value: any;
  export default value;
}

declare module "@site/static/data/contributors-processed.json" {
  interface Contributor {
    login: string;
    avatar_url: string;
    html_url: string;
  }
  const contributors: Contributor[];
  export default contributors;
}

declare module "@site/static/data/donors-processed.json" {
  interface Donor {
    login: string;
    avatar_url: string;
    html_url: string;
  }
  const donors: Donor[];
  export default donors;
}

// Type declarations for @site component imports
declare module "@site/src/components/Contributors" {
  import { ComponentType } from "react";
  const Contributors: ComponentType<any>;
  export default Contributors;
}

declare module "@site/src/components/Store" {
  import { ComponentType } from "react";
  const Store: ComponentType<any>;
  export default Store;
}
