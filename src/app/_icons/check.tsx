const Check = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="m10.7 17.4-.392.454.49.424.385-.522-.483-.356Zm4.2-5.7-.483-.356.483.356Zm-6.4 3.8-.398.45.006.004.392-.454Zm2.683 2.256 4.2-5.7-.966-.712-4.2 5.7.966.712Zm4.2-5.7 4.2-5.7-.966-.712-4.2 5.7.966.712Zm-9.88 1.593 2.6 2.3.795-.898-2.6-2.3-.796.898Zm2.605 2.305 2.2 1.9.784-.908-2.2-1.9-.784.908Z"
      />
    </svg>
  )
}

export { Check }
