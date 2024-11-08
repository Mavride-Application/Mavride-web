import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import logo_black from "../assets/mavride_black.png";
import SvgIcons from "../components/SvgIcons";
import notification from "../assets/notification.jpg";
import profile from "../assets/profile_img.png";
import { NavLink, Outlet } from "react-router-dom";
import arrow_down from "../assets/arrow_down.png";

const UserManagementLayout = () => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const dropdownRefs = useRef({});
  const arrowRefs = useRef({});

  const toggleDropdown = (title) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [title]: !prevState[title],
    }));

    const isOpening = !openDropdowns[title];

    // Animate the dropdown and arrow rotation
    gsap.to(dropdownRefs.current[title], {
      height: isOpening ? "auto" : 0,
      opacity: isOpening ? 1 : 0,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(arrowRefs.current[title], {
      rotate: isOpening ? 90 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    // Initialize dropdown heights to 0 (closed) for each dropdown
    Object.keys(dropdownRefs.current).forEach((key) => {
      gsap.set(dropdownRefs.current[key], { height: 0, opacity: 0 });
    });
  }, []);

  return (
    <div className="management_container">
      <div className="management_wrapper flex">
        <div className="management_left_nav card sticky left-0 top-0 flex h-[100dvh] basis-[20%] justify-center">
          <div className="management-center w-[80%]">
            <div className="mb-[70px] flex h-[70px] items-center">
              <img src={logo_black} alt="Logo" className="w-[150px]" />
            </div>
            <ul className="flex min-h-[70dvh] flex-col justify-between">
              {[
                [
                  "Overview",
                  "/dashboard",
                  <SvgIcons number="0" fill="#8C8C8C" />,
                ],
                [
                  "Manage users",
                  "",
                  <SvgIcons number="1" fill="#8C8C8C" />,
                  <SvgIcons number="7" fill="#8C8C8C" />,
                  ["Drivers", "Members"],
                ],
                [
                  "Trips",
                  "",
                  <SvgIcons number="2" fill="#8C8C8C" />,
                  <SvgIcons number="7" fill="#8C8C8C" />,
                  ["Ongoing", "Completed"],
                ],
                [
                  "Transactions",
                  "/dashboard/Transactions",
                  <SvgIcons number="3" />,
                ],
                [
                  "Notifications",
                  "/dashboard/Notifications",
                  <SvgIcons number="4" />,
                ],
                ["Messages", "/dashboard/Messages", <SvgIcons number="5" />],
                ["Support", "/dashboard/Support", <SvgIcons number="6" />],
              ].map(([title, link, icon, arrowIcon, subItems]) => (
                <li key={title} className="w-[85%] cursor-pointer">
                  <NavLink to={link}>
                    <div
                      className="flex items-center justify-between"
                      onClick={() => subItems && toggleDropdown(title)}
                    >
                      <div className="flex items-center gap-2">
                        {icon}
                        <p className="font-outfit text-[#A6AAB7]">{title}</p>
                      </div>
                      {subItems && (
                        <span
                          ref={(el) => (arrowRefs.current[title] = el)}
                          className="inline-block transition-transform"
                        >
                          {arrowIcon}
                        </span>
                      )}
                    </div>
                  </NavLink>

                  {/* Dropdown menu */}
                  {subItems && (
                    <ul
                      ref={(el) => (dropdownRefs.current[title] = el)}
                      className="mt-2 space-y-2 overflow-hidden pl-7 transition-all"
                    >
                      {subItems.map((subItem) => (
                        <li key={subItem} className="py-1 font-outfit">
                          <NavLink
                            to={`/dashboard/${subItem.toLowerCase()}`}
                            className="block text-[0.881rem] text-[#A6AAB7] hover:text-black"
                          >
                            {subItem}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="management_right basis-[80%]">
          <div className="flex justify-center w-full">
            <div className="w-full">
              <div className="management_right_top px-8 z-30 sticky top-0 flex h-[70px] w-full items-center justify-end bg-white shadow-sm">
                <div className="flex items-center gap-5">
                  <img src={notification} alt="Notification" />
                  <div className="profile flex items-center gap-3">
                    <img src={profile} alt="Profile" />
                    <div className="profile_name font-inter">
                      <p className="text-[0.861rem] text-[#70757D]">
                        Kingsley Francis
                      </p>
                      <p className="text-[0.70625rem] text-[#A4A7AA]">Admin</p>
                    </div>
                    <img src={arrow_down} alt="" />
                  </div>
                </div>
              </div>

              <div className="management_right_bottom_children px-8">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementLayout;
