import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head, usePage } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { type SharedData } from '@/types';
import { useMemo } from 'react';

type RegisterPageProps = SharedData & {
    perguruanTinggi: Array<{
        uuid: string;
        nama: string;
        nama_singkat?: string | null;
    }>;
};

export default function Register() {
    const { perguruanTinggi } = usePage<RegisterPageProps>().props;
    const perguruanTinggiOptions = useMemo(
        () => perguruanTinggi ?? [],
        [perguruanTinggi],
    );

    return (
        <AuthLayout
            title="Daftar Akun Baru"
            description="Masukkan detail Anda untuk membuat akun baru"
        >
            <Head title="Daftar" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nama Lengkap</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Nama lengkap Anda"
                                    className="h-11 border-gray-300 text-black focus:border-blue-600 focus:ring-blue-600"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Alamat Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="nama@univ.ac.id"
                                    className="h-11 border-gray-300 text-black focus:border-blue-600 focus:ring-blue-600"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="nidn" className="text-sm font-medium text-gray-700">
                                    NIDN
                                </Label>
                                <Input
                                    id="nidn"
                                    type="text"
                                    tabIndex={3}
                                    name="nidn"
                                    placeholder="Nomor Induk Dosen Nasional"
                                    className="h-11 border-gray-300 text-black focus:border-blue-600 focus:ring-blue-600"
                                />
                                <InputError message={errors.nidn} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="uuid_pt" className="text-sm font-medium text-gray-700">
                                    Perguruan Tinggi
                                </Label>
                                <select
                                    id="uuid_pt"
                                    name="uuid_pt"
                                    required
                                    tabIndex={4}
                                    className="h-11 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Pilih perguruan tinggi
                                    </option>
                                    {perguruanTinggiOptions.map((pt) => (
                                        <option key={pt.uuid} value={pt.uuid}>
                                            {pt.nama_singkat ?? pt.nama}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.uuid_pt} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Kata Sandi</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={5}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Kata sandi"
                                    className="h-11 border-gray-300 text-black focus:border-blue-600 focus:ring-blue-600"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700">
                                    Konfirmasi Kata Sandi
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={6}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Konfirmasi kata sandi"
                                    className="h-11 border-gray-300 text-black focus:border-blue-600 focus:ring-blue-600"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm"
                                tabIndex={7}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Daftar Akun
                            </Button>
                        </div>

                        <div className="text-center text-sm text-gray-600">
                            Sudah punya akun?{' '}
                            <TextLink href={login()} tabIndex={8} className="text-blue-600 hover:text-blue-700 font-medium">
                                Masuk ke Sistem
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
