import type {ReactNode} from 'react';
import SectionPageLayout from '@site/src/components/SectionPageLayout';
import {profilePhotoUrl} from '@site/src/data/aboutProfile';
import {aboutNav, aboutSubtitle} from '@site/src/data/sectionNav';

type AboutPageLayoutProps = {
  activeHref: string;
  children: ReactNode;
};

export default function AboutPageLayout({
  activeHref,
  children,
}: AboutPageLayoutProps): ReactNode {
  return (
    <SectionPageLayout
      title="About"
      subtitle={aboutSubtitle}
      sectionLabel="About"
      navItems={aboutNav}
      activeHref={activeHref}
      profileImage={{src: profilePhotoUrl, alt: 'Jitender Sharma'}}
    >
      {children}
    </SectionPageLayout>
  );
}
