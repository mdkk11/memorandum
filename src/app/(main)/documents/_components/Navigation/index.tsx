import { getSession } from '@/libs/auth';
import { getAllFolders } from '@/services/folders/getAllFolders';
import { AddFolderButton } from './AddFolderButton';
import { AllFolderListLink } from './AllFolderListLink';
import { Container } from './Container';
import { FolderList } from './FolderList';
import { TrashBox } from './TrashBox';
import { UserMenu } from './UserMenu';
/**
 * @package
 */
export const Navigation = async () => {
  const session = await getSession();
  if (!session) return;
  const { folders } = await getAllFolders({ authorId: session.user.id });

  return (
    <Container>
      <UserMenu {...session.user} />
      <AllFolderListLink />
      <TrashBox />
      <AddFolderButton length={folders.length} />
      <FolderList folders={folders} />
    </Container>
  );
};
