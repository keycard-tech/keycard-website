import { TwitterIcon } from '@status-im/icons/social'
import { testimonials, type Testimonial } from '../_data/testimonials'
import { Image } from './image'
import { Tag } from './tag'

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const profileImage = testimonial.profileImage || testimonial.imageSrc
  const hasTweetImage =
    testimonial.tweetImage && !testimonial.tweetImage.includes('x.com/i/status')

  return (
    <a
      href={testimonial.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex size-[280px] flex-col overflow-hidden rounded-20 border border-white-8 bg-white-4 transition-all hover:border-white-12 hover:bg-white-8 lg:size-[300px]"
    >
      <div className="mb-3 flex items-start gap-3 p-5 pb-0">
        <div className="relative size-12 flex-shrink-0 overflow-hidden rounded-full">
          <Image
            src={profileImage}
            alt={testimonial.imageAlt}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-1 truncate text-14 font-500 text-white-95">
            {testimonial.author}
          </p>
          <p className="line-clamp-2 text-12 font-300 text-white-60">
            {testimonial.authorTitle}
          </p>
        </div>
        <div className="flex-shrink-0">
          {testimonial.sourceType === 'tweet' ? (
            <Tag size="small" icon={<TwitterIcon />}>
              {''}
            </Tag>
          ) : testimonial.badge ? (
            <Tag size="small" gradient={true}>
              {testimonial.badge}
            </Tag>
          ) : (
            <Tag size="small">Review</Tag>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col px-5">
        <p className="mb-3 line-clamp-3 font-lora text-20 font-400 leading-relaxed text-white-95">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        {hasTweetImage && (
          <div className="relative mt-auto h-24 w-full overflow-hidden rounded-12">
            <Image
              src={testimonial.tweetImage!}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 250px, 270px"
            />
          </div>
        )}
      </div>
    </a>
  )
}

const TestimonialsStrip = () => {
  return (
    <section className="mx-auto max-w-[1352px] px-3 pb-[40px] pt-[60px] lg:pb-[60px] lg:pt-[80px] min-[1512px]:px-0">
      <div className="snap-x snap-mandatory overflow-x-auto scrollbar-none">
        <div className="flex gap-4 pb-4 lg:gap-6">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="flex-shrink-0 snap-start">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { TestimonialsStrip }
