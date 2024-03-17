// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// import required modules
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Navigation, Pagination } from 'swiper/modules';
import HorizontalCommunityItem from '../pages/communities/partials/HorizontalCommunityItem';

export default function TestSwiper() {
	const swiper = useSwiper();

	return (
		<>
			<Swiper
				// dir="rtl"
				navigation={true}
				slidesPerView={3}
				spaceBetween={30}
				onSlideChange={(swiper) => {
					console.log(swiper);
				}}
				// pagination={{
				//   clickable: true,
				// }}
				modules={[Pagination, Navigation]}
				className='mySwiper relative'
			>
				<button
					type='button'
					onClick={() => swiper.slidePrev()}
					className='absolute left-3 top-1/2 -translate-y-1/2 z-10 community_suggestions rounded-full p-1 shadow-lg shadow-dark-hover hover:shadow-md transition-all'
				>
					<ChevronLeft className='text-light-lighter size-10' />
				</button>
				<button
					type='button'
					onClick={() => swiper.slideNext()}
					className='absolute right-3 top-1/2 -translate-y-1/2 z-10 community_suggestions rounded-full p-1 shadow-lg shadow-dark-hover hover:shadow-md transition-all'
				>
					<ChevronRight className='text-light-lighter size-10' />
				</button>
				<SwiperSlide>
					<HorizontalCommunityItem avatar='https://loremflickr.com/cache/resized/65535_52993392781_af788eaf13_c_640_480_nofilter.jpg' />
				</SwiperSlide>
				<SwiperSlide>
					<HorizontalCommunityItem avatar='https://loremflickr.com/cache/resized/65535_52993392781_af788eaf13_c_640_480_nofilter.jpg' />
				</SwiperSlide>
				<SwiperSlide>
					<HorizontalCommunityItem avatar='https://loremflickr.com/cache/resized/65535_52993392781_af788eaf13_c_640_480_nofilter.jpg' />
				</SwiperSlide>
				<SwiperSlide>
					<HorizontalCommunityItem avatar='https://loremflickr.com/cache/resized/65535_52993392781_af788eaf13_c_640_480_nofilter.jpg' />
				</SwiperSlide>
				<SwiperSlide>
					<HorizontalCommunityItem avatar='https://loremflickr.com/cache/resized/65535_52993392781_af788eaf13_c_640_480_nofilter.jpg' />
				</SwiperSlide>
				<SwiperSlide>
					<HorizontalCommunityItem avatar='https://loremflickr.com/cache/resized/65535_52993392781_af788eaf13_c_640_480_nofilter.jpg' />
				</SwiperSlide>
				<SwiperSlide>
					<HorizontalCommunityItem avatar='https://loremflickr.com/cache/resized/65535_52993392781_af788eaf13_c_640_480_nofilter.jpg' />
				</SwiperSlide>
				<SwiperSlide>
					<HorizontalCommunityItem avatar='https://loremflickr.com/cache/resized/65535_52993392781_af788eaf13_c_640_480_nofilter.jpg' />
				</SwiperSlide>
				<SwiperSlide>
					<HorizontalCommunityItem avatar='https://loremflickr.com/cache/resized/65535_52993392781_af788eaf13_c_640_480_nofilter.jpg' />
				</SwiperSlide>
			</Swiper>
		</>
	);
}
