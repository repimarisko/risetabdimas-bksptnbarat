import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(
    props: ImgHTMLAttributes<HTMLImageElement>,
) {
    return (
        <img
            {...props}
            src="/images/bks-ptn-logo-bulat.png"
            alt="BKS PTN Wilayah Barat"
            className="h-14 w-14 object-contain"
        />
    );
}
