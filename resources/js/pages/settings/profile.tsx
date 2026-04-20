import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { send } from '@/routes/verification';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';


import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/profile';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengaturan Profil',
        href: edit().url,
    },
];

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth, userDetail } = usePage<
        SharedData & { userDetail?: Record<string, any> | null }
    >().props;

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan Profil" />

            <SettingsLayout>
                <div className="space-y-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2  border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke Dashboard
                        </Link>
                    </div>

                    <HeadingSmall
                        title="Informasi Profil"
                        description="Perbarui nama dan alamat email Anda"
                    />

                    <Form
                        {...ProfileController.update.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-6"
                    >
                        {({ processing, recentlySuccessful, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>

                                    <Input
                                        id="name"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.name}
                                        name="name"
                                        required
                                        autoComplete="name"
                                        placeholder="Full name"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.email}
                                        name="email"
                                        required
                                        autoComplete="username"
                                        placeholder="Email address"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
                                    />
                                </div>

                                <div className=" border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                                    Lengkapi data berikut untuk memenuhi syarat pengajuan proposal.
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="nama_lengkap">Nama Lengkap</Label>
                                        <Input
                                            id="nama_lengkap"
                                            name="nama_lengkap"
                                            defaultValue={userDetail?.nama_lengkap ?? auth.user.name}
                                            required
                                        />
                                        <InputError className="mt-1" message={errors.nama_lengkap} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="hp">No. HP</Label>
                                        <Input
                                            id="hp"
                                            name="hp"
                                            defaultValue={userDetail?.hp ?? ''}
                                            required
                                        />
                                        <InputError className="mt-1" message={errors.hp} />
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="grid gap-2">
                                        <Label htmlFor="nik">NIK</Label>
                                        <Input
                                            id="nik"
                                            name="nik"
                                            maxLength={16}
                                            defaultValue={userDetail?.nik ?? ''}
                                            required
                                        />
                                        <InputError className="mt-1" message={errors.nik} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="nip">NIP</Label>
                                        <Input
                                            id="nip"
                                            name="nip"
                                            maxLength={18}
                                            defaultValue={userDetail?.nip ?? ''}
                                        />
                                        <InputError className="mt-1" message={errors.nip} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="nuptk">NIDN/NUPTK</Label>
                                        <Input
                                            id="nuptk"
                                            name="nuptk"
                                            maxLength={16}
                                            defaultValue={userDetail?.nuptk ?? ''}
                                        />
                                        <InputError className="mt-1" message={errors.nuptk} />
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="grid gap-2">
                                        <Label htmlFor="tempat_lahir">Tempat Lahir</Label>
                                        <Input
                                            id="tempat_lahir"
                                            name="tempat_lahir"
                                            defaultValue={userDetail?.tempat_lahir ?? ''}
                                            required
                                        />
                                        <InputError className="mt-1" message={errors.tempat_lahir} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
                                        <Input
                                            id="tanggal_lahir"
                                            name="tanggal_lahir"
                                            type="date"
                                            defaultValue={userDetail?.tanggal_lahir ?? ''}
                                            required
                                        />
                                        <InputError className="mt-1" message={errors.tanggal_lahir} />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="alamat">Alamat</Label>
                                    <Textarea
                                        id="alamat"
                                        name="alamat"
                                        defaultValue={userDetail?.alamat ?? ''}
                                        required
                                        rows={3}
                                    />
                                    <InputError className="mt-1" message={errors.alamat} />
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="sinta_id">SINTA ID</Label>
                                        <Input
                                            id="sinta_id"
                                            name="sinta_id"
                                            defaultValue={userDetail?.sinta_id ?? ''}
                                        />
                                        <InputError className="mt-1" message={errors.sinta_id} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="scopus_id">Scopus ID</Label>
                                        <Input
                                            id="scopus_id"
                                            name="scopus_id"
                                            defaultValue={userDetail?.scopus_id ?? ''}
                                        />
                                        <InputError className="mt-1" message={errors.scopus_id} />
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="sinta_link">Link SINTA</Label>
                                        <Input
                                            id="sinta_link"
                                            name="sinta_link"
                                            type="url"
                                            placeholder="https://sinta.kemdikbud.go.id/..."
                                            defaultValue={userDetail?.sinta_link ?? ''}
                                        />
                                        <InputError className="mt-1" message={errors.sinta_link} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="scopus_link">Link Scopus</Label>
                                        <Input
                                            id="scopus_link"
                                            name="scopus_link"
                                            type="url"
                                            placeholder="https://www.scopus.com/..."
                                            defaultValue={userDetail?.scopus_link ?? ''}
                                        />
                                        <InputError className="mt-1" message={errors.scopus_link} />
                                    </div>
                                </div>

                                {mustVerifyEmail &&
                                    auth.user.email_verified_at === null && (
                                        <div>
                                            <p className="-mt-4 text-sm text-muted-foreground">
                                                Your email address is
                                                unverified.{' '}
                                                <Link
                                                    href={send()}
                                                    as="button"
                                                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                                >
                                                    Click here to resend the
                                                    verification email.
                                                </Link>
                                            </p>

                                            {status ===
                                                'verification-link-sent' && (
                                                    <div className="mt-2 text-sm font-medium text-green-600">
                                                        A new verification link has
                                                        been sent to your email
                                                        address.
                                                    </div>
                                                )}
                                        </div>
                                    )}

                                <div className="flex items-center gap-4">
                                    <Button disabled={processing} data-test="update-profile-button">
                                        Save
                                    </Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out duration-300"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="flex items-center gap-2  border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                                            ✅ Profil berhasil disimpan!
                                        </div>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Form>
                </div>


            </SettingsLayout>
        </AppHeaderLayout>
    );
}
