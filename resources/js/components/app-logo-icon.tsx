import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            {...props}
            src="/images/bks-ptn-logo.png"
            alt="BKS PTN Wilayah Barat"
        />
    );
}
