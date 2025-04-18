import type { ToastType } from "@/src/components/toast/toast"

export function getIconToast(type: ToastType) {
  switch (type) {
    case "info":
      return (
        <svg
          aria-hidden
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="8"
            cy="8.0002"
            r="5.8"
            fill="#D9D9DE"
            fillOpacity="0.1"
            stroke="#D9D9DE"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 6.3998C8.44182 6.3998 8.8 6.04163 8.8 5.5998C8.8 5.15798 8.44182 4.7998 8 4.7998C7.55817 4.7998 7.2 5.15798 7.2 5.5998C7.2 6.04163 7.55817 6.3998 8 6.3998ZM8 7.9998C7.55817 7.9998 7.2 8.35798 7.2 8.7998V10.3998C7.2 10.8416 7.55817 11.1998 8 11.1998C8.44182 11.1998 8.8 10.8416 8.8 10.3998V8.7998C8.8 8.35798 8.44182 7.9998 8 7.9998Z"
            fill="#D9D9DE"
          />
        </svg>
      )
    case "success":
      return (
        <svg
          aria-hidden
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.88">
            <path
              d="M13.8 8.0002C13.8 8.76186 13.65 9.51607 13.3585 10.2198C13.067 10.9234 12.6398 11.5628 12.1012 12.1014C11.5626 12.64 10.9232 13.0672 10.2196 13.3587C9.51587 13.6502 8.76166 13.8002 8 13.8002C7.23833 13.8002 6.48412 13.6502 5.78043 13.3587C5.07674 13.0672 4.43736 12.64 3.89878 12.1014C3.3602 11.5628 2.93297 10.9234 2.6415 10.2198C2.35002 9.51607 2.2 8.76186 2.2 8.0002C2.2 6.46194 2.81107 4.98669 3.89878 3.89898C4.98649 2.81127 6.46174 2.2002 8 2.2002C9.53825 2.2002 11.0135 2.81127 12.1012 3.89898C13.1889 4.98669 13.8 6.46194 13.8 8.0002Z"
              fill="#22C543"
              fillOpacity="0.16"
            />
            <path
              d="M6.06666 8.48353L7.51666 9.93353L9.93333 6.5502M13.8 8.0002C13.8 8.76186 13.65 9.51607 13.3585 10.2198C13.067 10.9234 12.6398 11.5628 12.1012 12.1014C11.5626 12.64 10.9232 13.0672 10.2196 13.3587C9.51587 13.6502 8.76166 13.8002 8 13.8002C7.23833 13.8002 6.48412 13.6502 5.78043 13.3587C5.07674 13.0672 4.43736 12.64 3.89878 12.1014C3.3602 11.5628 2.93297 10.9234 2.6415 10.2198C2.35002 9.51607 2.2 8.76186 2.2 8.0002C2.2 6.46194 2.81107 4.98669 3.89878 3.89898C4.98649 2.81127 6.46174 2.2002 8 2.2002C9.53825 2.2002 11.0135 2.81127 12.1012 3.89898C13.1889 4.98669 13.8 6.46194 13.8 8.0002Z"
              stroke="#22C543"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      )
    case "warning":
      return (
        <svg
          aria-hidden
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="7.99999"
            cy="7.9998"
            r="5.8"
            transform="rotate(-180 7.99999 7.9998)"
            fill="#F36B16"
            fillOpacity="0.12"
            stroke="#F36B16"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.99999 9.6002C7.55816 9.6002 7.19999 9.95837 7.19999 10.4002C7.19999 10.842 7.55816 11.2002 7.99999 11.2002C8.44182 11.2002 8.79999 10.842 8.79999 10.4002C8.79999 9.95837 8.44182 9.6002 7.99999 9.6002ZM7.99999 8.0002C8.44182 8.0002 8.79999 7.64202 8.79999 7.2002L8.79999 5.6002C8.79999 5.15837 8.44182 4.8002 7.99999 4.8002C7.55816 4.8002 7.19999 5.15837 7.19999 5.6002L7.19999 7.2002C7.19999 7.64202 7.55816 8.0002 7.99999 8.0002Z"
            fill="#F36B16"
          />
        </svg>
      )
    case "error":
      return (
        <svg
          aria-hidden
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.88">
            <path
              d="M9.82299 2.2002H6.17704C5.75269 2.2002 5.34573 2.36877 5.04567 2.66882L2.66864 5.04585C2.36858 5.34591 2.20001 5.75288 2.20001 6.17722V9.82317C2.20001 10.2475 2.36858 10.6545 2.66864 10.9545L5.04567 13.3316C5.34573 13.6316 5.75269 13.8002 6.17704 13.8002H9.82298C10.2473 13.8002 10.6543 13.6316 10.9544 13.3316L13.3314 10.9545C13.6314 10.6545 13.8 10.2475 13.8 9.82317V6.17722C13.8 5.75288 13.6314 5.34591 13.3314 5.04585L10.9544 2.66882C10.6543 2.36877 10.2473 2.2002 9.82299 2.2002Z"
              fill="#EF4444"
              fillOpacity="0.16"
              stroke="#EF4444"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.00001 9.6002C8.44184 9.6002 8.80001 9.95837 8.80001 10.4002C8.80001 10.842 8.44184 11.2002 8.00001 11.2002C7.55818 11.2002 7.20001 10.842 7.20001 10.4002C7.20001 9.95837 7.55818 9.6002 8.00001 9.6002ZM8.00001 8.0002C7.55818 8.0002 7.20001 7.64202 7.20001 7.2002V5.6002C7.20001 5.15837 7.55818 4.8002 8.00001 4.8002C8.44184 4.8002 8.80001 5.15837 8.80001 5.6002V7.2002C8.80001 7.64202 8.44184 8.0002 8.00001 8.0002Z"
              fill="#EF4444"
            />
          </g>
        </svg>
      )

    default:
      break
  }
}
