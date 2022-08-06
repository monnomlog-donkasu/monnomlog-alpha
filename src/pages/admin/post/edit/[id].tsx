import { useAdminPageGuard } from "@common/hooks";
import useToast from "@common/hooks/use-toast";
import { editingPostAtom } from "@common/store";
import type { MonnomlogPage } from "@modules/content/types";
import PostEditorWrapper from "@modules/editor/components/PostEditorWrapper";
import NoLayoutWrapper from "@modules/layout/NoLayout";
import type { Post } from "@modules/supabase/supabase";
import { anonPosts } from "@modules/supabase/supabase";
import axiosGlobal from "axios";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import type { GetServerSideProps } from "next";
import { useCallback } from "react";

const axios = axiosGlobal.create();

interface IPostEditProps {
  post: Post;
}

export const getServerSideProps: GetServerSideProps<IPostEditProps> = async (
  context
) => {
  let id = context.params?.id;
  if (Array.isArray(id)) {
    [id] = id;
  }

  if (!id) {
    return {
      notFound: true,
    };
  }

  const postResponse = await anonPosts().select("*").eq("id", id).single();

  if (!postResponse.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post: postResponse.data },
  };
};

const PostEdit: MonnomlogPage<IPostEditProps> = (props) => {
  useAdminPageGuard();
  const { post: postProp } = props;
  // const router = useRouter();
  const toast = useToast();

  // const post = useMyStoreMemo((store) => store.editingPost, []);
  // const setPost = useMyStoreMemo((store) => store.setEditingPost, []);

  useHydrateAtoms([[editingPostAtom, postProp]]);
  const [editingPost] = useAtom(editingPostAtom);

  const onSaveButtonClick = useCallback(async () => {
    try {
      const { data: result } = await axios.post<Post>(
        `/api/post/save/${postProp?.id}`,
        editingPost
      );
      toast({
        status: "success",
        title: "포스팅이 성공적으로 저장되었습니다.",
      });

      // eslint-disable-next-line no-console
      console.log("result", result);
    } catch (e: unknown) {
      toast({
        status: "error",
        title: "포스팅 저장이 실패했습니다.",
      });

      // eslint-disable-next-line no-console
      console.log("error", e);
    }
  }, [editingPost, postProp, toast]);

  if (!postProp) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  return <PostEditorWrapper onSaveButtonClick={onSaveButtonClick} />;
};

PostEdit.layoutWrapper = NoLayoutWrapper;

export default PostEdit;
