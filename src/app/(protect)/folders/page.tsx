"use client";
import Link from "next/link";
import { useFolderList } from "./_components/useFolderList.hook";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddNewFolder } from "./_components/useAddNewFolder.hook";
import { FolderListNavbar } from "./_components/FolderListNavbar";

export default function FolderListPage() {
  const { isPending, isError, folderList, updateFolderList } = useFolderList();

  function closeModal() {
    if (document) {
      (document.getElementById("addNewFolderModal") as HTMLFormElement).close();
    }
  }
  function openModal() {
    if (document) {
      (
        document.getElementById("addNewFolderModal") as HTMLFormElement
      ).showModal();
    }
  }

  return (
    <>
      <FolderListNavbar />
      <main className="flex min-h-screen flex-col items-center gap-5 py-24 px-5 md:px-12 lg:px-24">
        <article className="prose">
          <h1>Vocabulary Builder</h1>
        </article>
        <h2 className="text-2xl">Folder List</h2>
        {isPending ? (
          <span className="loading loading-dots loading-md "></span>
        ) : null}
        <div className="grid w-full grid-cols-1 md:grid-cols-2 justify-around gap-5">
          {folderList.map((folder) => {
            return (
              <div
                key={folder.folderId}
                className="card w-96 bg-base-100 shadow-md p-5"
              >
                <Link href={`/folders/${folder.folderId}`}>
                  {folder.folderName}
                </Link>
              </div>
            );
          })}
          <div
            className="card w-96 bg-base-100 text-neutral-content shadow-md p-5"
            onClick={openModal}
          >
            Add new
          </div>
        </div>
        <AddNewFolderModal
          onAddNewFolderSuccess={() => {
            updateFolderList();
            closeModal();
          }}
          closeModal={() => closeModal()}
        />
      </main>
    </>
  );
}

type Inputs = {
  folderName: string;
};

type AddNewFolderModalProps = {
  onAddNewFolderSuccess?: () => void;
  closeModal: () => void;
};
function AddNewFolderModal(props: AddNewFolderModalProps) {
  const { onAddNewFolderSuccess, closeModal } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { addNewFolder, isPending, isError, errorMessage } = useAddNewFolder();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await addNewFolder({ folderName: data.folderName });
      if (onAddNewFolderSuccess) {
        onAddNewFolderSuccess();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <dialog id="addNewFolderModal" className="modal">
      <div className="modal-box">
        <button
          className="btn btn-xs btn-circle btn-ghost absolute right-2 top-2"
          onClick={closeModal}
        >
          ✕
        </button>
        <form
          method="dialog"
          className="flex items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="join">
            <input
              type="text"
              placeholder="Add your new folder"
              className="input input-bordered input-primary w-72 join-item"
              {...register("folderName")}
            />
            <button className="btn btn-primary join-item" type="submit">
              {isPending ? (
                <span className="loading loading-dots loading-sm "></span>
              ) : (
                "Add"
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
