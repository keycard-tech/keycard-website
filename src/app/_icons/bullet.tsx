const Bullet = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      {...props}
    >
      <path
        d="M6.5 10C6.5 7.5 7.5 6.5 10 6.5C12.5 6.5 13.5 7.5 13.5 10C13.5 12.5 12.5 13.5 10 13.5C7.5 13.5 6.5 12.5 6.5 10Z"
        fill="currentColor"
        fillOpacity="0.6"
      />
    </svg>
  )
}

export { Bullet }
