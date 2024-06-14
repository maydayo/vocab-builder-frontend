import { LearningStatus, Vocabulary } from "@/types/vocabulary.type";
import { useUpdateLearningStatus } from "./useUpdateLearningStatus";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  AcademicCapIcon,
  BookOpenIcon,
  ChevronDownIcon,
  PauseCircleIcon,
} from "@heroicons/react/16/solid";

type LearningStatusButtonProps = {
  vocabulary: Vocabulary;
  onUpdateStatusSuccess: () => void;
};

export function LearningStatusButton(props: LearningStatusButtonProps) {
  const { vocabulary, onUpdateStatusSuccess } = props;
  const { updateLearningStatusAsync, isPending: isUpdateStatusPending } =
    useUpdateLearningStatus();

  async function onClickToggleStatus(
    vocabularyId: string,
    newStatus: LearningStatus
  ) {
    const learningStatus = newStatus;
    updateLearningStatusAsync({ vocabularyId, learningStatus })
      .then(() => {
        onUpdateStatusSuccess();
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <Menu>
      <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
        {isUpdateStatusPending ? (
          <span className="loading-spinner" />
        ) : (
          <>{vocabulary.learningStatus}</>
        )}
        <ChevronDownIcon className="size-4 fill-white/60" />
      </MenuButton>

      <MenuItems
        anchor="bottom end"
        className="w-52 origin-top-right rounded-xl border border-white/5 bg-gray-800 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
      >
        <MenuItem>
          <button
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
            onClick={() => onClickToggleStatus(vocabulary.id, "idle")}
          >
            <PauseCircleIcon className="size-4 fill-white/30" />
            Idle
          </button>
        </MenuItem>
        <MenuItem>
          <button
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
            onClick={() => onClickToggleStatus(vocabulary.id, "learning")}
          >
            <BookOpenIcon className="size-4 fill-white/30" />
            Learning
          </button>
        </MenuItem>
        <div className="my-1 h-px bg-white/5" />
        <MenuItem>
          <button
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
            onClick={() => onClickToggleStatus(vocabulary.id, "learned")}
          >
            <AcademicCapIcon className="size-4 fill-white/30" />
            Learned
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>

    // <button
    //   onClick={() => onClickToggleStatus(vocabulary)}
    //   disabled={isUpdateStatusPending}
    // >
    //   {isUpdateStatusPending ? (
    //     <span className="loading-spinner" />
    //   ) : (
    //     <>{vocabulary.learningStatus}</>
    //   )}

    // </button>
  );
}
