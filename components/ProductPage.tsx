import { useState } from 'react';
import Head from 'next/head';
import { ChakraProvider, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, HStack, Text } from '@chakra-ui/react';

import ProductHeader from './ProductHeader';
import ProductDetails from './ProductDetails';
import ProductImageGallery from './ProductImageGallery';
import { IconBack } from './Icons';

import type { Product } from '../types';

type ProductPageProps = {
	productData: Product;
	shouldAnimate?: boolean;
};

const ProductPage = ({ productData, shouldAnimate = false }: ProductPageProps) => {
	const [shoppingCartItems, updateShoppingCartItems] = useState<Product[]>([]);
	const [isFullscreenShowing, setFullscreenShowing] = useState<boolean>(false);

	const onAddToCart = (product) => {
		const items = [...shoppingCartItems, product];
		updateShoppingCartItems(items);
	};

	const onFullscreen = () => {
		setFullscreenShowing(true);
	};
	const onFullscreenClose = () => {
		setFullscreenShowing(false);
	};
	return (
		<ChakraProvider>
			<Head>
				<title>
					{productData.productTitle} by {productData.companyName} - Background
				</title>
			</Head>
			<div
				className={`bg-white border-2 border-solid border-slate-600 demo relative ${
					isFullscreenShowing ? 'overflow-hidden max-h-screen w-100' : ''
				}`}>
				<ProductHeader shoppingCartItems={shoppingCartItems} shouldAnimate={shouldAnimate} />
				<main className="text-black my-2 max-w-[1400px] mx-auto">
					<HStack>
						<Button variant="link" color="currentColor" size="sm" leftIcon={<IconBack />}>
							&lt; Back
						</Button>
						<Text>/</Text>
						<Breadcrumb separator="/" fontSize="sm" color="black">
							<BreadcrumbItem>
								<BreadcrumbLink href="#hike-camp" color="black">
									Hike &amp; Camp
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbItem>
								<BreadcrumbLink href={productData.breadcrumb.slug} color="black">
									{productData.breadcrumb.title}
								</BreadcrumbLink>
							</BreadcrumbItem>
						</Breadcrumb>
					</HStack>
					<section className="grid grid-cols-1 gap-2 md:grid-cols-6">
						<div className="col-span-4">
							<ProductImageGallery
								imageData={productData.images}
								onFullscreenOpen={() => onFullscreen()}
								onFullscreenClose={() => onFullscreenClose()}
							/>
						</div>
						<div className="col-span-2 px-4 md:px-0">
							<ProductDetails product={productData} onAddToCart={onAddToCart} />
						</div>
					</section>
				</main>
			</div>
		</ChakraProvider>
	);
};
export default ProductPage;
