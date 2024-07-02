import { Heading } from '../Heading';
import { LinkButton } from '../LinkButton';
import { Typography } from '../Typography';
import styles from './style.module.css';

export function NotFound() {
  return (
    <div className={styles.module}>
      <div className={styles.message}>
        <Heading bold level={'h1'} size={'xxxl'}>
          Not Found
        </Heading>
        <Typography>お探しのページは見つかりませんでした</Typography>
      </div>
      <p>
        <LinkButton color="gray" href="/">
          TOP へ戻る
        </LinkButton>
      </p>
    </div>
  );
}
