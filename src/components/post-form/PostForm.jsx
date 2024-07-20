import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RTE } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ButtonUI } from "../ui/button";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [editorHeight, setEditorHeight] = useState(500);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredimage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredimage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredimage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userid: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  useEffect(() => {
    const handleResize = () => {
      const parentHeight =
        document.querySelector(".parent-container").offsetHeight;
      setEditorHeight(parentHeight);
    };

    // Initial calculation
    handleResize();

    // Recalculate on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(editorHeight);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className=" text-blue-200 mt-2 relative pb-14"
    >
      <div className="grid grid-cols-3 h-screen parent-container max-md:grid-cols-1 max-md:h-full">
        <div className="col-span-2 max-md:order-last">
          <RTE
            edHeight={editorHeight}
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />{" "}
        </div>
        <div className=" grid justify-evenly flex-col col-span-1 w-full sm:px-2">
          {/*title*/}
          <div className="justify-self-start w-full mt-1 ">
            <Input
              label="Title :"
              placeholder="Title"
              className="sm:mb-4 mb-2 rounded-[8px]  inline-block items-start "
              {...register("title", { required: true })}
            />{" "}
            <Input
              label="Featured Image :"
              type="file"
              className="mb-4 rounded-[8px] "
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />
            {post && (
              <div className="w-full mb-4 overflow-clip max-h-[310px] overflow-y-auto flex items-center  ">
                <img
                  src={appwriteService.getFilePreview(post.featuredimage)}
                  alt={post.title}
                  className="rounded-lg  "
                />
              </div>
            )}
          </div>

          <div className="px-2 flex flex-col justify-evenly  w-full">
            <div>
              <Select onValueChange={(value) => setValue("status", value)}>
                <SelectTrigger className="w-full  rounded-[8px] mb-2 ">
                  <SelectValue placeholder="Choose" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 text-blue-200">
                  <SelectItem value="active">active</SelectItem>
                  <SelectItem value="inactive">inactive</SelectItem>
                </SelectContent>
                <input
                  type="hidden"
                  {...register("status", { required: true })}
                  value={watch("status")}
                />
              </Select>
              <ButtonUI
                type="submit"
                variant="outline_auth"
                bgColor={post ? "bg-green-500" : undefined}
                className="hover:bg-slate-700 rounded-[9px] w-full mt-2"
              >
                {post ? "Update" : "Submit"}
              </ButtonUI>
            </div>
          </div>
        </div>
      </div>
      <Input
        readOnly={true}
        label="Slug :"
        placeholder=""
        className="mb-4 border-none text-transparent"
        {...register("slug", { required: true })}
        onInput={(e) => {
          setValue("slug", slugTransform(e.currentTarget.value), {
            shouldValidate: true,
          });
        }}
      />
    </form>
  );
}

{
  /* <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        /> */
}

{
  /*btn*/
}
