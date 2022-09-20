import type { Editor } from "slate";
import { Transforms } from "slate";

import type { ElementNode } from "../types";

// eslint-disable-next-line import/prefer-default-export
export const withImage = (editor: Editor) => {
  const { isVoid, normalizeNode } = editor;

  // eslint-disable-next-line no-param-reassign
  editor.isVoid = (element: ElementNode) => {
    return element.type === "IMAGE" || isVoid(element);
  };

  // eslint-disable-next-line no-param-reassign
  editor.normalizeNode = (entry) => {
    const [node, path] = entry;
    const nextPath = [
      ...path.slice(0, -1),
      (path[path.length - 1] as number) + 1,
    ];

    if (node.type === "IMAGE_CONTAINER") {
      const children = node.children as ElementNode[];
      if (children.length === 1) {
        // 이미지만 있고 캡션이 없는 경우
        const child = children[0];
        if (child) {
          if (child.type === "IMAGE") {
            Transforms.wrapNodes(
              editor,
              {
                type: "IMAGE_CAPTION",
                width: child.width,
                children: [
                  {
                    type: "TEXT",
                    text: "",
                  },
                ],
              },
              { at: [...path, 1] }
            );
          } else {
            Transforms.unwrapNodes(editor, { at: path.concat(0) });
            Transforms.setNodes(editor, { type: "PARAGRAPH" }, { at: path });
          }
        }
      }
      if (children.length === 3) {
        Transforms.moveNodes(editor, {
          at: path.concat(2),
          to: nextPath,
        });
        Transforms.setNodes(
          editor,
          {
            type: "PARAGRAPH",
          },
          { at: nextPath }
        );
      }
    }

    return normalizeNode(entry);
  };

  return editor;
};
