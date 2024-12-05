const LineGradient = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="484"
      height="1"
      viewBox="0 0 484 1"
    >
      <path
        stroke="url(#line-use-cases)"
        strokeOpacity=".95"
        strokeWidth="2"
        d="M484 1H0"
      />
      <defs>
        <linearGradient
          id="line-use-cases"
          x1="-10"
          x2="484"
          y1="1.5"
          y2="1.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const LinearGradientMobile = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="260"
      height="1"
      viewBox="0 0 260 1"
      preserveAspectRatio="none"
      className="w-full"
      fill="none"
    >
      <path
        d="M260 1H0"
        stroke="url(#paint0_linear_1509_4725)"
        strokeOpacity="0.95"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1509_4725"
          x1="0"
          y1="1.5"
          x2="260"
          y2="1.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export { LineGradient, LinearGradientMobile }
