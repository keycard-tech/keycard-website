import { cx } from 'cva'
import Image from 'next/image'

type Props = {
  className?: string
}

const Shield = (props: Props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={props.className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1252_12446)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.6 0.5V2.4062C11.246 2.42007 11.8458 2.45799 12.4 2.5276V1H13.6V2.74837C14.5768 2.99632 15.3706 3.39705 15.9868 4.01324C16.6547 4.68118 17.0695 5.55778 17.3109 6.65H19V7.85H17.5013C17.5527 8.33344 17.582 8.84997 17.5938 9.4H19.5V10.6H17.5938C17.5778 11.3443 17.5299 12.0273 17.4384 12.65H19V13.85H17.1836C16.9326 14.7131 16.5495 15.424 15.9868 15.9868C15.3706 16.603 14.5768 17.0037 13.6 17.2516V19H12.4V17.4724C11.8458 17.542 11.246 17.5799 10.6 17.5938V19.5H9.4V17.5938C8.75401 17.5799 8.15424 17.542 7.6 17.4724V19H6.4V17.2516C5.42319 17.0037 4.62942 16.603 4.01324 15.9868C3.45048 15.424 3.06744 14.7131 2.81637 13.85H1L1 12.65H2.56163C2.47009 12.0273 2.42218 11.3443 2.4062 10.6H0.5V9.4H2.4062C2.41801 8.84997 2.44725 8.33344 2.49865 7.85H1L1 6.65H2.68909C2.93052 5.55778 3.34529 4.68118 4.01324 4.01324C4.62942 3.39705 5.42319 2.99632 6.4 2.74837V1H7.6V2.5276C8.15424 2.45799 8.75401 2.42007 9.4 2.4062V0.5H10.6ZM3.6 10C3.6 7.25657 3.98658 5.73694 4.86176 4.86176C5.73694 3.98658 7.25657 3.6 10 3.6C12.7434 3.6 14.2631 3.98658 15.1382 4.86176C16.0134 5.73694 16.4 7.25657 16.4 10C16.4 12.7434 16.0134 14.2631 15.1382 15.1382C14.2631 16.0134 12.7434 16.4 10 16.4C7.25657 16.4 5.73694 16.0134 4.86176 15.1382C3.98658 14.2631 3.6 12.7434 3.6 10ZM6.6 9.6C6.6 8.83071 6.63205 8.27111 6.71996 7.8532C6.80568 7.4457 6.93406 7.22455 7.09159 7.08102C7.25554 6.93164 7.5208 6.80264 8.0029 6.7174C8.48731 6.63175 9.13076 6.6 10 6.6C10.8704 6.6 11.5102 6.63195 11.9905 6.72244C12.4649 6.81183 12.7244 6.9479 12.8882 7.11176C13.0521 7.27562 13.1882 7.53506 13.2776 8.00953C13.3681 8.48983 13.4 9.1296 13.4 10C13.4 10.8704 13.3681 11.5102 13.2776 11.9905C13.1882 12.4649 13.0521 12.7244 12.8882 12.8882C12.7244 13.0521 12.4649 13.1882 11.9905 13.2776C11.5102 13.3681 10.8704 13.4 10 13.4C9.12843 13.4 8.49237 13.3678 8.01611 13.2726C7.54962 13.1793 7.29458 13.0365 7.12942 12.8567C6.9585 12.6705 6.81633 12.3716 6.72427 11.8319C6.63186 11.2902 6.6 10.5712 6.6 9.6ZM10 5.4C9.11924 5.4 8.38769 5.43075 7.79397 5.53573C7.19795 5.64111 6.68196 5.83086 6.28341 6.19398C5.87844 6.56295 5.66307 7.04805 5.54566 7.60618C5.43045 8.15389 5.4 8.81929 5.4 9.6C5.4 10.5788 5.43064 11.3848 5.54136 12.0337C5.65242 12.6847 5.854 13.242 6.24558 13.6683C6.64292 14.101 7.16913 14.327 7.78077 14.4493C8.38263 14.5697 9.12157 14.6 10 14.6C10.8796 14.6 11.6148 14.5694 12.2127 14.4568C12.8163 14.3431 13.3381 14.1354 13.7368 13.7368C14.1354 13.3381 14.3431 12.8163 14.4568 12.2127C14.5694 11.6148 14.6 10.8796 14.6 10C14.6 9.1204 14.5694 8.38517 14.4568 7.78735C14.3431 7.18369 14.1354 6.66188 13.7368 6.26324C13.3381 5.8646 12.8163 5.65692 12.2127 5.54319C11.6148 5.43055 10.8796 5.4 10 5.4Z"
        fill="white"
        fillOpacity="0.6"
      />
    </g>
    <defs>
      <clipPath id="clip0_1252_12446">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const Github = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    className={props.className}
  >
    <circle cx="10" cy="10" r="8" fill="#010101" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M11.876 17.78a8.024 8.024 0 0 1-3.734.004v-.27a503.28 503.28 0 0 1-.008-1.826c-1.884.356-2.371-.471-2.521-.904a2.794 2.794 0 0 0-.77-1.086c-.262-.144-.637-.5-.009-.51.24.027.47.113.671.25.2.137.366.322.483.539a1.59 1.59 0 0 0 1.588.833c.21-.025.412-.093.596-.199.032-.39.202-.756.478-1.028-1.669-.192-3.412-.856-3.412-3.797a3.036 3.036 0 0 1 .768-2.066 2.828 2.828 0 0 1 .075-2.038s.628-.202 2.063.788a6.902 6.902 0 0 1 3.75 0c1.434-1 2.062-.788 2.062-.788.278.644.305 1.373.075 2.038.506.562.781 1.302.769 2.066 0 2.951-1.753 3.605-3.422 3.797.18.186.317.41.404.655.088.245.122.507.102.768 0 .684-.004 1.722-.007 2.417l-.001.356Z"
      clipRule="evenodd"
    />
  </svg>
)

const Infinity = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    className={props.className}
  >
    <path
      fill="#fff"
      fillOpacity=".95"
      d="M5.26 5.5c1.668 0 2.934.884 3.798 1.8.37.36.68.753.957 1.113.247-.36.494-.688.927-1.113.864-.916 2.13-1.8 3.828-1.8C17.117 5.5 19 7.496 19 9.984c0 2.52-1.883 4.516-4.23 4.516-1.698 0-2.964-.884-3.828-1.767a9.573 9.573 0 0 1-.927-1.146c-.277.36-.586.753-.957 1.146-.864.883-2.13 1.767-3.797 1.767C2.883 14.5 1 12.504 1 9.984 1 7.496 2.883 5.5 5.26 5.5Zm-2.5 4.484c0 1.472 1.111 2.65 2.5 2.65 1.02 0 1.853-.556 2.563-1.276a9.66 9.66 0 0 0 1.08-1.374c-.277-.393-.586-.851-1.08-1.342-.679-.72-1.543-1.277-2.562-1.277-1.39 0-2.501 1.179-2.501 2.619Zm14.48 0c0-1.44-1.111-2.619-2.47-2.619-1.05 0-1.914.557-2.593 1.277-.556.556-.927 1.145-1.08 1.342.277.425.617.883 1.08 1.374.71.72 1.543 1.276 2.593 1.276 1.359 0 2.47-1.178 2.47-2.65Z"
    />
  </svg>
)

const features = [
  {
    title: 'Best in class security',
    description:
      'Our secure element has the highest level of security EAL6+ certified by Common Criteria.',
    image: '/assets/feature-keycard.png',
    badge: { icon: Shield, text: 'EAL 6+', gradient: true },
    className: 'row-span-2 col-span-1',
  },
  {
    title: '100% open source',
    description:
      'We have nothing to hide! Our software, hardware and construction is fully open source.',
    button: { icon: Github, text: 'View on GitHub' },
    className: 'col-span-1',
  },
  {
    title: 'Fully airgapped',
    description:
      "Through KeyPro's camera or Keycard's contactless nature, our products are truly airgapped.",
    image: '/assets/feature-keycard-pro.png',
    badge: { text: '0 cables' },
    className: 'row-span-2 col-span-1 flex-col-reverse',
    gradient: true,
  },
  {
    title: 'Made to last',
    description:
      'Your keycard has a life expectancy of 25+ years, resists water and dust. It will still securely store your keys.',
    badge: { text: '25+ years' },
    className: 'col-span-1',
  },
  {
    title: 'Easy to backup',
    description:
      'Create cards to back up your master key and store them in a safe place instead of the typical piece of paper.',
    badge: { icon: Infinity, text: 'backups' },
    className: 'col-span-1',
  },
  {
    title: 'Discreet',
    description:
      'With its light, small and discreet form factor your Keycard can go unnoticed in your wallet.',
    badge: { text: 'Credit card format' },
    className: 'col-span-1',
  },
]

const UnderlinedWord = ({ children }: { children: React.ReactNode }) => (
  <div className="relative inline-block">
    <span className="relative z-10 [text-shadow:_-3px_2px_black,_4px_1px_black,_2px_0px_black,_3px_2px_black]">
      {children}
    </span>
    <div className="absolute bottom-1 left-0 -z-10 h-px w-full bg-orange" />
  </div>
)

const KeycardFeatures = () => {
  return (
    <section className="mx-auto max-w-[1352px] pt-[200px]">
      <h1 className="max-w-[665px] font-lora text-32 text-white-95">
        Join the <UnderlinedWord>open source</UnderlinedWord> revolution of the
        most <UnderlinedWord>modular</UnderlinedWord> and{' '}
        <UnderlinedWord>future proof</UnderlinedWord> hardware wallet system
        ever conceived.
      </h1>
      <div className="grid grid-cols-4 gap-6 pt-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className={cx([
              'relative flex flex-col justify-between overflow-clip rounded-28 border border-white-6 bg-white-6',
              feature.className,
            ])}
          >
            {feature.image && (
              <div className={`flex items-center justify-center`}>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  className="size-full rounded-12 object-cover"
                  width="500"
                  height="500"
                />
              </div>
            )}
            {feature.gradient && (
              <div className="absolute -bottom-10 left-0 h-1/2 w-full rounded-12 bg-gradient-to-b from-[transparent] to-dark-60" />
            )}
            <div className="p-6">
              <div>
                <h3 className="mb-[6px] font-lora text-24 font-400">
                  {feature.title}
                </h3>
                {feature.description && (
                  <p className="mb-6 text-16 font-300 text-white-60">
                    {feature.description}
                  </p>
                )}
                {feature.badge && (
                  <div
                    className={cx([
                      'flex w-fit items-center gap-[6px] rounded-[32px] border border-white-12 py-2 pl-[14px] pr-4 text-16 text-white-95',
                      feature.badge.gradient &&
                        'bg-gradient-to-b from-[transparent] to-white-12',
                    ])}
                  >
                    {feature.badge.icon && <feature.badge.icon />}
                    <span>{feature.badge.text}</span>
                  </div>
                )}
                {feature.button && (
                  <button className="mt-4 flex items-center gap-[6px] rounded-12 bg-white-100 px-4 py-2 text-16 font-500 text-dark-100">
                    <span>{feature.button.text}</span>
                    <feature.button.icon />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export { KeycardFeatures }
