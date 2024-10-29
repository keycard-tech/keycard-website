const ChevronDown = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        stroke="#fff"
        strokeOpacity=".95"
        strokeWidth="1.2"
        d="m5.5 8 4.5 4.5L14.5 8"
      />
    </svg>
  )
}

export { ChevronDown }
