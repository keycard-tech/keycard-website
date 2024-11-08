const Plus = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.4 10.6V16.5H10.6V10.6H16.5V9.4H10.6V3.5H9.4V9.4H3.5V10.6H9.4Z"
        fill="white"
      />
    </svg>
  )
}

export { Plus }
