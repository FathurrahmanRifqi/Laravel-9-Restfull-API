// import Navbar from './navbar'

import React from 'react';
import { IconSun, IconMoonStars } from '@tabler/icons';
import { AppShell, Navbar, Header, Group, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { MainLinks } from './_mainLinks.tsx';
import { User } from './_user.tsx';
import { Logo } from './_logo.tsx';

export default function Layout({children}){
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    return (
        <AppShell
            padding="md"
            fixed={false}
            navbar={
                <Navbar width={{ base: 300 }} p="xs">
                <Navbar.Section grow mt="xs">
                    <MainLinks />
                </Navbar.Section>
                <Navbar.Section>
                    <User />
                </Navbar.Section>
                </Navbar>
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
