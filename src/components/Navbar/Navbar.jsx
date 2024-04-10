import React from 'react';
// import './Navbar.scss';
import { Link } from 'gatsby';
import { Menu, Transition } from '@headlessui/react';
import Logo from '../../images/goodeworkers.svg';
import Hamburger from '../Miscs/Hamburger';

export default function Navbar() {
  return (
    <div className="bg-black sticky inset-x-0 top-0 lg:mt-16 z-50">
      <nav className="relative flex justify-between items-center font-inter max-w-screen-2xl mx-auto px-4 md:px-8 pt-2 pb-2 md:pt-4 md:pb-4 text-grey">
        <Link to="/">
          <img
            src={Logo}
            alt="Good eWorkers"
            className="w-[110px] h-[44px] md:w-[160px] md:h-[63px]"
          />
        </Link>
        <ul className="hidden md:flex md:space-x-12 font-bold">
          <li>
            <Link to="/#projects">Our Projects</Link>
          </li>
          <li>
            <Link to="/#about">Who Are We?</Link>
          </li>
          <li>
            <Link to="/article">Blog</Link>
          </li>
          <li>
            <Link to="/#faq">FAQ</Link>
          </li>
          <li>
            <Link
              to="/#contact"
              className="border-orange border-2 -ml-2 px-2 py-px rounded-full"
            >
              Contact
            </Link>
          </li>
        </ul>
        <Menu>
          <Menu.Button className="md:hidden relative z-50">
            <span className="sr-only">Menu</span>
            <Hamburger />
          </Menu.Button>
          <div className="md:hidden absolute top-0 inset-x-0 z-40">
            <Transition
              enter="transition duration-100 ease-in"
              enterFrom="transform -translate-y-2 opacity-0"
              enterTo="transform translate-y-0 opacity-100"
              leave="transition duration-75"
              leaveFrom="transform translate-y-0 opacity-100"
              leaveTo="transform -translate-y-2 opacity-0"
            >
              <Menu.Items className="bg-black h-screen text-white font-bold text-xl pt-12">
                <li className="pl-16 pr-4 py-3">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/#projects"
                        className={`hover:text-orange block w-full h-full ${
                          active && 'text-orange'
                        }`}
                      >
                        Our Projects
                      </Link>
                    )}
                  </Menu.Item>
                </li>
                <li className="pl-16 pr-4 py-3">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/#about"
                        className={`hover:text-orange block w-full h-full ${
                          active && 'text-orange'
                        }`}
                      >
                        Who Are We?
                      </Link>
                    )}
                  </Menu.Item>
                </li>
                <li className="pl-16 pr-4 py-3">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/#faq"
                        className={`hover:text-orange block w-full h-full ${
                          active && 'text-orange'
                        }`}
                      >
                        FAQ
                      </Link>
                    )}
                  </Menu.Item>
                </li>
                <li className="pl-16 pr-4 py-3">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/#contact"
                        className={`hover:text-orange block w-full h-full ${
                          active && 'text-orange'
                        }`}
                      >
                        Contact
                      </Link>
                    )}
                  </Menu.Item>
                </li>
              </Menu.Items>
            </Transition>
          </div>
        </Menu>
      </nav>
    </div>
  );
}
