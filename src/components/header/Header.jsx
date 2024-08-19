import { useState } from "react";
import { Global } from "../../helpers/Global";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks";

// const products = [
//     { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
//     { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
//     { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
//     { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
//     { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
// ]
// const callsToAction = [
//     { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
//     { name: 'Contact sales', href: '#', icon: PhoneIcon },
// ]

const Header = ({ role }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { auth } = useAuth();

  const nav = {
    admin: [
      {
        id: 1,
        to: "/inicio/clientes",
        title: "Clientes",
      },
      {
        id: 2,
        to: "/inicio/ordenes",
        title: "Ordenes de Servicio",
      },
      {
        id: 3,
        to: "/inicio/empleados",
        title: "Usuarios",
      },
      {
        id: 4,
        to: "perfil",
        title: "Yo",
      },
    ],
    user: [
      {
        id: 1,
        to: "/inicio/ordenes",
        title: "Ordenes de Servicio",
      },
      {
        id: 2,
        to: "perfil",
        title: "Yo",
      },
    ],
  };

  return (
    <header className="bg-slate-200">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <NavLink to="/inicio" className="-m-1.5 p-1.5">
            <span className="sr-only">Mi Alarma</span>
            <img alt="" src={Global.images.logo} className="h-16 rounded-3xl" />
          </NavLink>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {/* <Popover className="relative">
                        <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            Product
                            <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                        </PopoverButton>

                        <PopoverPanel
                            transition
                            className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                            <div className="p-4">
                                {products.map((item) => (
                                    <div
                                        key={item.name}
                                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-red-400"
                                    >
                                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-red-400 group-hover:bg-white">
                                            <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                                        </div>
                                        <div className="flex-auto">
                                            <NavLink to={item.href} className="block font-semibold text-gray-900">
                                                {item.name}
                                                <span className="absolute inset-0" />
                                            </NavLink>
                                            <p className="mt-1 text-gray-600">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-red-400">
                                {callsToAction.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.href}
                                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                                    >
                                        <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </PopoverPanel>
                    </Popover> */}

          <>
            {role == "owner" || role == "admin"
              ? nav.admin.map(({ id, to, title }) => {
                  return (
                    <NavLink
                      key={id}
                      to={to}
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      {title}
                    </NavLink>
                  );
                })
              : nav.user.map(({ id, to, title }) => {
                  return (
                    <NavLink
                      key={id}
                      to={to}
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      {title}
                    </NavLink>
                  );
                })}
          </>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <NavLink
            to={`/inicio/logout`}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cerrar Sesion <span aria-hidden="true">&rarr;</span>
          </NavLink>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-9" />
        <DialogPanel className="fixed inset-y-0 right-0 z-9 w-full overflow-y-auto bg-slate-200 px-5 py-2 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink to="/inicio" className="-m-1.5 p-1.5">
              <span className="sr-only">Mi Alarma</span>
              <img
                alt="Hola"
                src={Global.images.logo}
                className="h-16 rounded-3xl"
              />
            </NavLink>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-600">
              <div className="space-y-2 py-6">
                {/* <Disclosure as="div" className="-mx-3">
                                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-red-400">
                                        Product
                                        <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 space-y-2">
                                        {[...products, ...callsToAction].map((item) => (
                                            <DisclosureButton
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-red-400"
                                            >
                                                {item.name}
                                            </DisclosureButton>
                                        ))}
                                    </DisclosurePanel>
                                </Disclosure> */}
                {role == "owner" || role == "admin"
                  ? nav.admin.map(({ id, to, title }) => {
                      return (
                        <NavLink
                          key={id}
                          to={to}
                          onClick={() => setMobileMenuOpen(false)}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-red-400"
                        >
                          {title}
                        </NavLink>
                      );
                    })
                  : nav.user.map(({ id, to, title }) => {
                      return (
                        <NavLink
                          key={id}
                          to={to}
                          onClick={() => setMobileMenuOpen(false)}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-red-400"
                        >
                          {title}
                        </NavLink>
                      );
                    })}
              </div>
              <div className="py-6">
                <NavLink
                  to="/inicio/logout"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-red-400"
                >
                  Cerrar Sesion
                </NavLink>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
