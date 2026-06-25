import type {ReactNode} from 'react';
import SectionPageLayout from '@site/src/components/SectionPageLayout';
import {profilePhotoUrl} from '@site/src/data/aboutProfile';
import {aboutSubtitle} from '@site/src/data/sectionNav';

type AboutPageLayoutProps = {
  children: ReactNode;
};

export default function AboutPageLayout({children}: AboutPageLayoutProps): ReactNode {
  return (
    <SectionPageLayout
      title="About"
      subtitle={aboutSubtitle}
      sectionLabel="About"
      hideNav
      profileImage={{src: profilePhotoUrl, alt: 'Jitender Sharma'}}
    >
      {children}
    </SectionPageLayout>
  );
}
