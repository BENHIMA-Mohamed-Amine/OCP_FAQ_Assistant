import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

export function FooterComponent() {
  return (
    <div className="bg-custom-green">
      <Footer
        container
        className="flex flex-col items-center w-5/6 md:w-4/6 md:flex-row  mx-auto bg-custom-green shadow-none h-[97px] md:h-[67px]"
      >
        <FooterCopyright
          href="#"
          by="made with ❤️ by BENHIMA Mohamed-amine"
          year={2024}
          className="text-white text-[9px] md:text-sm flex flex-col items-center md:flex-row pb-1 md:pb-0"
        />
        <FooterLinkGroup>
          <FooterLink href="#">
            <img
              src="./src/assets/linkedin.png"
              alt="linkedin image"
              className="h-[18px] w-[18px]"
            />
          </FooterLink>
          <FooterLink href="#">
            <img
              src="./src/assets/mail.png"
              alt="emil image"
              className="h-[18px] w-[18px]"
            />
          </FooterLink>
          <FooterLink href="#">
            <img
              src="./src/assets/github.png"
              alt="github image"
              className="h-[18px] w-[18px]"
            />
          </FooterLink>
        </FooterLinkGroup>
      </Footer>
    </div>
  );
}
