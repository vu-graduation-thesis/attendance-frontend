import { MemoExoticComponent } from "react";

export interface PublicRoutes {
  path: string;
  component: MemoExoticComponent<() => JSX.Element>;
  layout?: (props: any) => JSX.Element;
}

export interface PrivateRoutes {
  path: string;
  component: MemoExoticComponent<() => JSX.Element>;
  layout?: (props: any) => JSX.Element;
}
