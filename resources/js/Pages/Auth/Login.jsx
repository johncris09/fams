import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  BarChart4,
  HandCoins,
  Users,
  FileText, HelpCircle
} from "lucide-react";
import { Label } from "@/Components/ui/label";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import logo from "./../../../../resources/js/image/logo.png";
import { useEffect, useState } from "react";
export default function Login({ status, canResetPassword }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { projectFullName } = usePage().props;

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Get window dimensions
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Calculate mouse position as a percentage of the window (-0.5 to 0.5)
      const x = e.clientX / width - 0.5;
      const y = e.clientY / height - 0.5;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("login"), {
      onFinish: () => reset("password"),
    });
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
      )}

      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50 p-4">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-slate-200/50 bg-[size:20px_20px]"></div>

        {/* Decorative financial assistance management elements with parallax effect */}
        <div className="absolute left-0 top-0 h-full w-full">
          {/* Top left decorative element */}
          <div
            className="absolute left-[10%] top-[15%] flex h-16 w-16 items-center justify-center rounded-full bg-blue-100/80 p-3 shadow-sm transition-transform duration-200 ease-out"
            style={{
              transform: `translate(${mousePosition.x * -30}px, ${
                mousePosition.y * -30
              }px)`,
            }}
          >
            <HandCoins className="h-8 w-8 text-blue-500/70" />
          </div>

          {/* Bottom right decorative element */}
          <div
            className="absolute bottom-[15%] right-[10%] flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100/80 p-3 shadow-sm transition-transform duration-200 ease-out"
            style={{
              transform: `translate(${mousePosition.x * 40}px, ${
                mousePosition.y * 40
              }px)`,
            }}
          >
            <BarChart4 className="h-8 w-8 text-emerald-500/70" />
          </div>

          {/* Top right decorative element */}
          <div
            className="absolute right-[15%] top-[25%] flex h-12 w-12 items-center justify-center rounded-full bg-amber-100/80 p-2 shadow-sm transition-transform duration-200 ease-out"
            style={{
              transform: `translate(${mousePosition.x * 25}px, ${
                mousePosition.y * -25
              }px)`,
            }}
          >
            <Users className="h-6 w-6 text-amber-500/70" />
          </div>

          {/* Bottom left decorative element */}
          <div
            className="absolute bottom-[25%] left-[15%] flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100/80 p-2 shadow-sm transition-transform duration-200 ease-out"
            style={{
              transform: `translate(${mousePosition.x * -20}px, ${
                mousePosition.y * 20
              }px)`,
            }}
          >
            <FileText className="h-6 w-6 text-indigo-500/70" />
          </div>

          {/* Center top decorative element */}
          <div
            className="absolute left-[50%] top-[10%] flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-purple-100/80 p-2 shadow-sm transition-transform duration-200 ease-out"
            style={{
              transform: `translate(${mousePosition.x * 15}px, ${
                mousePosition.y * -15
              }px) translateX(-50%)`,
            }}
          >
            <HelpCircle className="h-5 w-5 text-purple-500/70" />
          </div>

          {/* Large wave pattern with subtle parallax */}
          <div
            className="absolute bottom-0 left-0 h-[30%] w-full bg-gradient-to-t from-blue-100/40 to-transparent transition-transform duration-300 ease-out"
            style={{
              transform: `translateY(${mousePosition.y * 10}px)`,
            }}
          ></div>
          <div
            className="absolute bottom-0 left-0 h-[20%] w-full bg-gradient-to-t from-emerald-100/30 to-transparent transition-transform duration-300 ease-out"
            style={{
              transform: `translateY(${mousePosition.y * 5}px)`,
            }}
          ></div>

          {/* Subtle grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div
          className="relative w-full max-w-md transition-transform duration-200 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -5}px, ${
              mousePosition.y * -5
            }px)`,
          }}
        >
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500/20 to-emerald-500/20 opacity-75 blur"></div>
          <Card className="relative border-0 bg-white/90 shadow-lg backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center pb-2">
              <div className="mx-auto flex flex-col items-center">
                <div className="mb-2 flex h-25 w-25 items-center justify-center rounded-l">
                  <img
                    className="rounded-full w-20 h-20"
                    src={logo}
                    alt="image description"
                  ></img>
                </div>
                <h3 className="text-lg font-medium text-blue-600">
                  {projectFullName}
                </h3>
              </div>
              <CardTitle className="text-2xl font-semibold">
                Welcome back
              </CardTitle>
              <CardDescription className="px-6">
                Sign in to manage assistance programs, track applications, and
                generate reports
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={submit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={(e) => setData("email", e.target.value)}
                      placeholder="your.email@organization.com"
                      className="h-11 rounded-md border-slate-200 bg-white/80 transition-colors focus:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500"
                      isFocused={true}
                    />
                    <InputError message={errors.email} className="mt-2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      value={data.password}
                      onChange={(e) => setData("password", e.target.value)}
                      className="h-11 rounded-md border-slate-200 bg-white/80 transition-colors focus:border-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500"
                    />

                    <InputError message={errors.password} className="mt-2" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      className="border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm font-normal text-slate-600"
                    >
                      Keep me signed in on this device
                    </Label>
                  </div>

                  <Button
                    disabled={processing}
                    className="h-11 w-full rounded-md bg-blue-600 font-medium transition-all hover:bg-blue-700"
                  >
                    Log in
                  </Button>

                  <div className="flex items-center justify-center text-xs text-slate-500">
                    <ShieldCheck className="mr-1 h-3 w-3" />
                    Secure, encrypted connection
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col p-6 pt-0">
              <div className="mt-4 text-center text-xs text-slate-500">
                By signing in, you agree to our{" "}
                <Link
                  href="/#"
                  className="text-blue-600 hover:text-blue-500 hover:underline transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/#"
                  className="text-blue-600 hover:text-blue-500 hover:underline transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
              <div className="mt-2 text-center text-xs text-slate-500">
                Need help? Contact our support team at{" "}
                <Link
                  // href="mailto:manabojc@gmail.com"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-500 hover:underline transition-colors"
                >
                  manabojc@gmail.com
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </GuestLayout>
  );
}
