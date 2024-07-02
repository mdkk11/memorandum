import { authGuard } from '@/services/authGuard';
import { Heading } from '@/ui/Heading';
import { Input } from '@/ui/Input';
import { Label } from '@/ui/Label';
import { Button } from './_components/Button';

export default async function ProfilePage() {
  const { name } = await authGuard();

  return (
    <form>
      <div className="space-y-8">
        <Heading className="mb-4 text-2xl font-bold" level="h1">
          プロフィール更新
        </Heading>
        <div className="space-y-1.5">
          <Label>プロフィール画像</Label>
          <div className="w-40">{/* <ImageCropper aspectRatio={1} defaultImage={defaultValue?.profileImage} name="profileImage" width={400} /> */}</div>
        </div>
        <div className="space-y-6">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">名前</Label>
            <Input defaultValue={name ?? ''} id="name" name="name" required type="text" />
          </div>
          <Button>更新する</Button>
        </div>
      </div>
    </form>
  );
}
