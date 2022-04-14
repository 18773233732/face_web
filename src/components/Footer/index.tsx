import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${'Do指导设计团队'}`}
      links={[
        {
          key: 'Do',
          title: 'Do Design',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/18773233732/face_web',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
