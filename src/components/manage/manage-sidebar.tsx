"use client";

import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

import { logout } from "@/lib/api/auth";

import Sidebar from "@/components/ui/sidebar/sidebar";

import { useSession } from "@/provider/session-provider";

const ManageSidebar = () => {
  const { data: session } = useSession({ required: true });
  const router = useRouter();

  if (!session) return redirect("/");

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

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
        {session.user?.nickname && (
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
              label={session.user?.nickname}
            />
            <Sidebar.Nav.Section.Item
              type="button"
              as="button"
              onClick={handleLogout}
              label="로그아웃"
            />
          </Sidebar.Nav.Section>
        )}
      </Sidebar.Nav>
    </Sidebar>
  );
};

export default ManageSidebar;
