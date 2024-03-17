// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import HorizontalCommunityItem from '../pages/communities/partials/HorizontalCommunityItem';

export default function App() {
	return (
		<>
			<Swiper
				// dir="rtl"
				navigation={true}
				slidesPerView={3}
				spaceBetween={30}
				// pagination={{
				//   clickable: true,
				// }}
				modules={[Navigation, Pagination]}
				className='mySwiper'
			>
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
