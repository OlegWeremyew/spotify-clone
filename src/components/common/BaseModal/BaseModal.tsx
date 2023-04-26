import {XMarkIcon} from '@heroicons/react/24/outline';
import {FC, useEffect, useRef, MouseEvent, ReactElement} from "react";
import {Nullable} from "../../../types";

export interface IBaseModal {
  onClose: () => void
}

export const BaseModal: FC<IBaseModal> = ({onClose: handleClose}): ReactElement => {

  const ref = useRef<Nullable<HTMLDivElement>>(null);
  const contentRef = useRef<Nullable<HTMLDivElement>>(null);

  const animate = (isClosing: boolean = false): void => {
    ref?.current?.classList.toggle('opacity-0', isClosing);
    contentRef?.current?.classList.toggle('-translate-y-10', isClosing);
  }

  const close = (): void => {
    animate(true);

    setTimeout(handleClose, 500);
  }

  useEffect(() => {
    setTimeout(animate);

    function handleEsc({key}: KeyboardEvent): void {
      if (key === 'Escape') close();
    }

    document.addEventListener('keydown', handleEsc);

    return () => document.removeEventListener('keydown', handleEsc);
  });

  return (
    <div
      className="fixed inset-0 bg-black/70 z-30 flex justify-center items-center opacity-0 transition-opacity duration-500"
      role="dialog"
      ref={ref}
      onClick={close}
    >
      <div
        className="flex flex-col relative bg-[#333] text-white h-80 w-[480px] rounded-xl -translate-y-10 transition-transform duration-500"
        ref={contentRef}
        onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
      >
        <button
          type='button'
          className="absolute right-0 p-3 text-neutral-500 hover:text-neutral-200"
          onClick={close}
        >
          <XMarkIcon className="h-8 w-8"/>
        </button>

        <h1 className="text-3xl pt-8 pb-3 px-8 font-bold leading-relaxed border-b border-neutral-600">
          About recommanedations
        </h1>
        <div className="py-6 px-8 overflow-y-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          quis impedit cum quo provident alias commodi expedita accusantium sit
          natus autem voluptates possimus ducimus necessitatibus numquam eum,
          nostrum saepe quidem. Aspernatur, aperiam! Labore est maxime velit
          doloremque saepe eos placeat blanditiis, consequatur, voluptatem
          obcaecati dolorem et quas quaerat neque odio, dicta tempora architecto
          optio voluptatum dolorum officia aliquam voluptates accusantium quis!
          Illum eaque quibusdam sit et. Enim excepturi cum numquam deserunt
          facere sit provident debitis tenetur voluptatem quidem. Fuga dolores
          animi aliquam accusantium molestiae iure molestias, harum voluptatibus
          sunt ratione, sapiente hic architecto ipsum quasi enim? Quasi
          perspiciatis nam nihil!
        </div>
      </div>

    </div>
  );
}
