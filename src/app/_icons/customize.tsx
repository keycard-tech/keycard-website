const Customize = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      fill="none"
      {...props}
    >
      <path
        fill="#fff"
        fillOpacity=".95"
        fillRule="evenodd"
        d="M7 3.5a2 2 0 0 1-2-2H4a2 2 0 0 1-2 2v1a2 2 0 0 1 2 2h1a2 2 0 0 1 2-2v-1Zm3.473 1.587a8.55 8.55 0 0 1-4.886 4.886 8.6 8.6 0 0 1 4.913 4.87l.055-.134A8.6 8.6 0 0 1 15.345 10a8.6 8.6 0 0 1-4.87-4.913ZM5.351 8.883a7.45 7.45 0 0 1-2.22.54A8.6 8.6 0 0 0 2.5 9.4V10.6A7.4 7.4 0 0 1 9.9 18h1.2a7.4 7.4 0 0 1 7.4-7.4V9.4h-.002A7.4 7.4 0 0 1 11.1 2H9.9c0 .211.008.422.023.631a7.45 7.45 0 0 1-4.572 6.252Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export { Customize }
