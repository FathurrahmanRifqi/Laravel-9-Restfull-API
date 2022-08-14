import { useState } from 'react';
import React from 'react';
import { 
    IconSun, 
    IconMoonStars,
    IconBellRinging,
    IconFingerprint,
    IconKey,
    IconSettings,
    Icon2fa,
    IconDatabaseImport,
    IconReceipt2,
    IconSwitchHorizontal,
    IconLogout, 
} from '@tabler/icons';
import { AppShell, Navbar, Header, Group, ActionIcon, useMantineColorScheme,createStyles, Code } from '@mantine/core';
// import { MantineLogo } from '@mantine/ds';

import { MainLinks } from './_mainLinks.tsx';
import { User } from './_user.tsx';
import { Logo } from './_logo.tsx';


const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');
    return {
      header: {
        paddingBottom: theme.spacing.md,
        marginBottom: theme.spacing.md * 1.5,
        borderBottom: `1px solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
      },
  
      footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `1px solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
      },
  
      link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,
  
        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  
          [`& .${icon}`]: {
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
          },
        },
      },
  
      linkIcon: {
        ref: icon,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
      },
  
      linkActive: {
        '&, &:hover': {
          backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
            .background,
          color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
          [`& .${icon}`]: {
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
          },
        },
      },
    };
  });

  const data = [
    { link: '', label: 'Notifications', icon: IconBellRinging },
    { link: '', label: 'Billing', icon: IconReceipt2 },
    { link: '', label: 'Security', icon: IconFingerprint },
    { link: '', label: 'SSH Keys', icon: IconKey },
    { link: '', label: 'Databases', icon: IconDatabaseImport },
    { link: '', label: 'Authentication', icon: Icon2fa },
    { link: '', label: 'Other Settings', icon: IconSettings },
  ];
  

export default function Layout({children}){
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Billing');
  
    const links = data.map((item) => (
      <a
        className={cx(classes.link, { [classes.linkActive]: item.label === active })}
        href={item.link}
        key={item.label}
        onClick={(event) => {
          event.preventDefault();
          setActive(item.label);
        }}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </a>
    ));
    return (
        <AppShell
            padding="md"
            fixed={false}
            navbar={
                <Navbar  width={{ sm: 300 }} p="md">
                <Navbar.Section grow>
                    <Group className={classes.header} position="apart">
                    {/* <MantineLogo size={28} /> */}
                    <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
                    </Group>
                    {links}
                </Navbar.Section>

                <Navbar.Section className={classes.footer}>
                    <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                    <span>Change account</span>
                    </a>

                    <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                    </a>
                </Navbar.Section>
                </Navbar>

                // <Navbar width={{ base: 300 }} p="xs">
                // <Navbar.Section grow mt="xs">
                //     <MainLinks />
                // </Navbar.Section>
                // <Navbar.Section>
                //     <User />
                // </Navbar.Section>
                // </Navbar>
            }
            
            header={
                <Header height={60}>
                <Group sx={{ height: '100%' }} px={20} position="apart">
                    <Logo colorScheme={colorScheme} />
                    <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                    {colorScheme === 'dark' ? <IconSun size={16} /> : <IconMoonStars size={16} />}
                    </ActionIcon>
                </Group>
                </Header>
            }
            
            styles={(theme) => ({
                main: {
                backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            })}
        >
        <main>{children}</main>
        </AppShell>
    );
}
