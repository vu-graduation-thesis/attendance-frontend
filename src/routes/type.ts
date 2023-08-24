import { MemoExoticComponent, ReactNode } from "react";

export interface PublicRoutes {
  path: string;
  component: MemoExoticComponent<() => JSX.Element>;
  layout?: (props: any) => ReactNode;
}

export interface PrivateRoutes {
  path: string;
  component: MemoExoticComponent<() => JSX.Element>;
  layout?: (props: any) => JSX.Element;
}
