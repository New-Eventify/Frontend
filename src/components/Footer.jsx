import FooterLinksSet from "./footer/FooterLinksSet";

const linksArray = [
  {
    setofLinks: "Company Info",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Contact Us", href: "/contact" },
      { name: "Careers", href: "/careers" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    setofLinks: "Help",
    links: [
      {
        name: "Account Support",
        href: "/account-support",
      },
      { name: "FAQs", href: "/faqs" },
      { name: "Customer Care", href: "/customer-care" },
      {
        name: "Ticket Purchase Terms & Conditions",
        href: "/ticket-terms",
      },
    ],
  },
  {
    setofLinks: "Categories",
    links: [
      { name: "Concerts & Gigs", href: "/concerts" },
      {
        name: "Festivals & Lifestyle",
        href: "/festivals",
      },
      {
        name: "Business & Networking",
        href: "/business",
      },
      { name: "Food & Drinks", href: "/food" },
      {
        name: "Performing Arts",
        href: "/performing-arts",
      },
      { name: "Sports & Outdoors", href: "/sports" },
      { name: "Exhibitions", href: "/exhibitions" },
      {
        name: "Workshops, Conferences & Classes",
        href: "/workshops",
      },
    ],
  },
  {
    setofLinks: "Follow Us",
    links: [
      { name: "Facebook", href: "https://www.facebook.com" },
      { name: "Instagram", href: "https://www.instagram.com" },
      { name: "Twitter", href: "https://www.twitter.com" },
      { name: "Youtube", href: "https://www.youtube.com" },
    ],
  },
  {
    setofLinks: "Download The App",
    links: [
      { name: "Get it on Google Play", href: "https://play.google.com" },
      {
        name: "Download on the App Store",
        href: "https://www.apple.com/app-store",
      },
    ],
  },
];

const Footer = () => {
  return (
    <div className="bg-appNavyBlue text-white py-12">
      <div className="inner grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {linksArray.map((linkSet, index) => (
          <FooterLinksSet
            key={index}
            linksName={linkSet.setofLinks}
            links={linkSet.links}
          />
        ))}
      </div>
    </div>
  );
};

export default Footer;
