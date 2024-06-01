"use client";

import Image from "next/image";

import Sidebar from "@/components/ui/sidebar/sidebar";

const ManageSidebar = () => {
  return (
    <Sidebar fixed className="left-[15px] top-[120px]">
      <Sidebar.Head className="h-full">
        <Sidebar.Head.Title>Menu</Sidebar.Head.Title>
        <Sidebar.Head.Toggle />
      </Sidebar.Head>
      <Sidebar.Nav className="h-full">
        <Sidebar.Nav.Section className="h-full grow">
          <Sidebar.Nav.Section.Item
            icon={
              <Image
                src="/svgs/question-nav.svg"
                width={20}
                height={20}
                alt="question-nav"
              />
            }
            activeIcon={
              <Image
                src="/svgs/question-nav-active.svg"
                width={20}
                height={20}
                alt="question-nav-active"
              />
            }
            label="질문 관리"
            href="/manage/question"
          />
          <Sidebar.Nav.Section.Item
            icon={
              <Image
                src="/svgs/template-nav.svg"
                width={20}
                height={20}
                alt="template-nav"
              />
            }
            activeIcon={
              <Image
                src="/svgs/template-nav-active.svg"
                width={20}
                height={20}
                alt="template-nav-active"
              />
            }
            label="템플릿 관리"
            href="/manage/template"
          />
        </Sidebar.Nav.Section>
        <Sidebar.Nav.Section className="mt-auto">
          <Sidebar.Separator />
          <Sidebar.Nav.Section.Item
            icon={
              <Image
                src="/svgs/user-profile.svg"
                width={22}
                height={22}
                alt="user-profile"
              />
            }
            label="닉네임"
          />
        </Sidebar.Nav.Section>
      </Sidebar.Nav>
    </Sidebar>
  );
};

export default ManageSidebar;
