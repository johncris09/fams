import Checkbox from '@/Components/Checkbox';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import logo from './../../../../resources/js/image/logo.png'
export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();

    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">
          {status}
        </div>
      )}

      <form onSubmit={submit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <img class="rounded-full w-20 h-20" src={logo} alt="image description"></img>
            <h2 className="text-xl font-bold">Financial Assistance Management System</h2>
            <p className="mt-3 text-balance text-muted-foreground">
              Login your account
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>

            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              className="mt-1 block w-full"
              autoComplete="username"
              isFocused={true}
              onChange={(e) => setData('email', e.target.value)}
            />

            <InputError message={errors.email} className="mt-2" />
          </div>
          <div className="grid gap-2">

            <Label htmlFor="password">Password</Label>

            <TextInput
              id="password"
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full"
              autoComplete="current-password"
              onChange={(e) => setData('password', e.target.value)}
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className=" block">
            <label className="flex items-center">
              <Checkbox
                name="remember"
                checked={data.remember}
                onChange={(e) =>
                  setData('remember', e.target.checked)
                }
              />
              <span className="ms-2 text-sm text-gray-600">
                Remember me
              </span>
            </label>
          </div>
          <div className=" flex items-center justify-end">
            {canResetPassword && (
              <Link
                href={route('password.request')}
                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Forgot your password?
              </Link>
            )}

            <PrimaryButton className="ms-4" disabled={processing}>
              Log in
            </PrimaryButton>
          </div>
        </div>
      </form>

    </GuestLayout>
  );
}
