import { FC, SVGProps } from "react";

export const LockIcon: FC = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 10V8C8 5.23857 9.2386 3 12 3C14.7614 3 16 5.23857 16 8V10"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.5 17.8V13.2C3.5 12.0799 3.5 11.5198 3.71799 11.092C3.90973 10.7157 4.21569 10.4097 4.59202 10.218C5.01984 10 5.57989 10 6.7 10H17.3C18.4201 10 18.9802 10 19.408 10.218C19.7843 10.4097 20.0903 10.7157 20.282 11.092C20.5 11.5198 20.5 12.0799 20.5 13.2V17.8C20.5 18.9201 20.5 19.4802 20.282 19.908C20.0903 20.2843 19.7843 20.5903 19.408 20.782C18.9802 21 18.4201 21 17.3 21H6.7C5.5799 21 5.01984 21 4.59202 20.782C4.21569 20.5903 3.90973 20.2843 3.71799 19.908C3.5 19.4802 3.5 18.9201 3.5 17.8Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16 14V17"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
