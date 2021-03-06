import type { Post } from "@prisma/client";
import type { NextPage } from "next";
import type { DefaultSession } from "next-auth";
import type { ReactElement, ReactNode } from "react";
import type React from "react";
import type { BaseEditor, Descendant, Element } from "slate";
import type {
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import type { SetOptional } from "type-fest";
import type { SetState, GetState } from "zustand";

export * from "./util";

declare module "slate" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & { type: "EDITOR" };
    Element: ElementNode;
    Text: InlineNode | EmptyText;
  }
}

declare module "next-auth" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Session {
    user: {
      id: number;
    } & DefaultSession["user"];
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type MonnomlogPage<P = {}> = NextPage<P> & {
  layoutWrapper?: (page: ReactElement) => ReactNode;
};

export type ContentType = { data: Descendant[] };

export type RenderPublicElementProps = SetOptional<
  RenderElementProps,
  "attributes"
>;

export type CommonRenderElementProps = SetOptional<
  RenderElementProps,
  "attributes"
>;

export interface ICodeBlockProps extends RenderElementProps {
  element: ICodeBlock;
}

export interface ICommonCodeBlockProps extends CommonRenderElementProps {
  element: ICodeBlock;
}

export type CodeBlockComponent = React.FC<ICommonCodeBlockProps>;

export type SerializedPost = Omit<
  Post,
  "updatedAt" | "createdAt" | "content"
> & {
  updatedAt: string;
  createdAt: string;
  content: ContentType;
};

export type CreatePostInput = Omit<
  Post,
  "content" | "createdAt" | "updatedAt" | "id"
> & {
  content: ContentType;
};

export type ElementNode = StandaloneElementNode | IImageCaption | IListItem;

export type StandaloneElementNode =
  | IParagraph
  | IHeading
  | ICodeBlock
  | ICodeBlockElement
  | ITable
  | ICallout
  | IGithubBlock
  | IQuote
  | IImage
  | IList
  | IHr
  | IYoutube;

export type ICallout = {
  type: "CALLOUT";
  colorScheme: "blue" | "green" | "red" | "yellow";
  icon: string;
  children: StandaloneElementNode[];
};

export type IHr = {
  type: "HR";
  children: [EmptyText];
};

export type IYoutube = {
  type: "YOUTUBE";
  iframeUrl: string;
  children: [EmptyText];
};

export type ITable = {
  type: "TABLE";
  children: [EmptyText];
  // TODO: ?????? ??????
};

export type IHeading = {
  type: "HEADING";
  children: InlineNode[];
  level: 1 | 2 | 3 | 4 | 5 | 6;
};

export type IList = {
  type: "LIST";
  children: IListItem[];
  ordered: boolean;
};

export type IListItem = {
  type: "LIST_ITEM";
  children: ElementNode[];
};

export type IImage = {
  type: "IMAGE";
  url: string;
  size:
    | {
        type: "FIT";
      }
    | {
        type: "EXACT";
        width: number;
        height: number;
      };
  alt?: string;
  children: [IImageCaption] | [EmptyText];
};

export type IQuote = {
  type: "QUOTE";
  children: StandaloneElementNode[];
};

export type ICodeBlock = {
  type: "CODE_BLOCK";
  lang: "tsx" | "js";
  showLines: boolean;
  showCopy: boolean;
  label?: string;
  url?: string;
  children: (ICodeBlockElement | ICodeBlockText)[];
};

export type ICodeBlockElement = {
  type: "CODE_BLOCK_ELEMENT";
  tagName: "span";
  properties?: {
    className?: string[];
  };
  children: (ICodeBlockElement | ICodeBlockText)[];
};

export type ICodeBlockText = {
  type: "CODE_BLOCK_TEXT";
  text: string;
  isNewline?: boolean;
};

export type ICodeExplainer = {
  line: number;
  children: StandaloneElementNode[];
};

export type IParagraph = {
  type: "PARAGRAPH";
  children: InlineNode[];
};

export type IImageCaption = {
  type: "IMAGE_CAPTION";
  children: InlineNode[];
};

export type IGithubBlock = {
  type: "GITHUB_BLOCK";
  children: [EmptyText];
  url: string;
};

type InlineNode = IText | ILink | IIcon | ICodeBlockText;

export type IText = {
  type: "TEXT";
  text: string;
  bold?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  italic?: boolean;
  code?: boolean;
  kbd?: boolean;
};

export type Mark = keyof Omit<IText, "type" | "text">;

export type IPlainText = {
  type: "PLAIN_TEXT";
  text: string;
};

export type EmptyText = {
  type: "NOOP";
  text: "";
};

export type ILink = {
  type: "LINK";
  text: string;
  url: string;
  internal?: boolean;
};

export type IIcon = {
  type: "ICON";
  icon: string;
};

export interface IBaseCommand {
  label: string;
  hiddenLabel?: string;
}

export interface IConvertCommand extends IBaseCommand {
  type: "CONVERT";
  to: Exclude<Element["type"], "HEADING" | "IMAGE_CAPTION">;
}

export interface INoopCommand extends IBaseCommand {
  type: "NOOP";
  label: "noop";
}

export interface IConvertHeadingCommand extends IBaseCommand {
  type: "CONVERT_HEADING";
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface IInsertImageCommand extends IBaseCommand {
  type: "INSERT_IMAGE";
}

export type Command =
  | IConvertCommand
  | INoopCommand
  | IConvertHeadingCommand
  | IInsertImageCommand;

export interface IUploadRequestInfo {
  url: string;
  method: "POST" | "PUT";
  headers: {
    [key: string]: string;
  };
}

export interface IGetUploadUrlParams {
  filename: string;
  filetype: string;
}

export interface IFileManager {
  /**
   *  PresignedUrl ??? ???????????? ????????? ????????? ???????????????.
   *
   *  AWS ?????? ??? ????????? ??????
   *  ```json
   *  {
   *    "headers": {
   *      "Policy": "abcde...",
   *      "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
   *      "X-Amz-Credential": "AKIAVYN6O3HUQNZ5JQHO/20220508/ap-northeast-2/s3/aws4_request",
   *      "X-Amz-Date": "20220508T132432Z",
   *      "X-Amz-Signature": "834f39e6a07a5344d39722c94c2b0aa3c90d20922674b13ca26c9c5d429e4288",
   *      "acl": "public-read",
   *      "bucket": "monnomlog-test",
   *      "key": "user/eric/1",
   *    },
   *    "method": "POST",
   *    "url": "https://s3.ap-northeast-2.amazonaws.com/monnomlog-test",
   *  }
   *  ```
   */
  getUploadUrl: (params: IGetUploadUrlParams) => Promise<IUploadRequestInfo>;

  getFileInfo: (id: string) => Promise<{
    type: "IMAGE" | "FILE";
    name: string;
    fullUrl: string;
    size: number;
    mimeType: string;
    alt?: string;
  }>;

  removeFile: (
    id: string
  ) => Promise<{ success: true } | { success: false; reason: string }>;
}

export type Merge<P, T> = Omit<P, keyof T> & T;

/** Object ?????? ?????? key ????????? ???????????????. */
export type Keys<T> = T extends Record<infer K, unknown> ? K : never;

/** Object ?????? key??? ?????? ?????? Value ????????? ???????????????. */
export type ValueOf<T, K extends string | number | symbol> = T extends Record<
  K,
  infer V
>
  ? V
  : never;

export type ColorModeStore = {
  colorMode: "dark" | "light";
  toggleColorMode: () => void;
};

export type AdminStore = {
  codeBlockEditPath: number[];
  openCodeBlockEditModal: (path: number[]) => void;
  closeCodeBlockEditModal: () => void;

  isOpenCommandPalette: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;

  isOpenImageInsertDialog: boolean;
  openImageInsertDialog: () => void;
  closeImageInsertDialog: () => void;

  editingPost: SerializedPost;
  setEditingPost: (post: SerializedPost) => void;

  editingPostInitialized: boolean;
  setEditingPostInitialized: (initialized: boolean) => void;
};

export type SplittedStores = ColorModeStore | AdminStore;

export type Stores = {
  [Key in Keys<SplittedStores>]: ValueOf<SplittedStores, Key>;
};

export type Set = SetState<Stores>;
export type Get = GetState<Stores>;

export type CommonRenderLeafProps = SetOptional<RenderLeafProps, "attributes">;

export interface IRenderTextProps extends CommonRenderLeafProps {
  leaf: IText;
}
