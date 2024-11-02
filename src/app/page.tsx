'use client'

import * as React from 'react'
import { ChevronDown, FileIcon, FolderIcon, BookOpen, Zap, Rocket, FolderTree, Key, Upload, Palette } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

const projectStructure = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'actions',
        type: 'folder',
        description: 'Contains server actions for AWS, Auth, and Data operations',
        children: [
          {
            name: 'AWS',
            type: 'folder',
            children: [{ name: 'ProfilePicUpload.ts', type: 'file', description: 'Handles profile picture uploads to AWS S3' }]
          },
          {
            name: 'Auth',
            type: 'folder',
            children: [
              { name: 'login.ts', type: 'file', description: 'Manages user login functionality' },
              { name: 'newVerification.tsx', type: 'file', description: 'Handles new user email verification' },
              { name: 'register.ts', type: 'file', description: 'Manages user registration process' }
            ]
          },
          {
            name: 'Data',
            type: 'folder',
            children: [
              {
                name: 'Token',
                type: 'folder',
                children: [{ name: 'GET.ts', type: 'file', description: 'Retrieves user tokens' }]
              },
              {
                name: 'User',
                type: 'folder',
                children: [{ name: 'GET.ts', type: 'file', description: 'Fetches user data' }]
              }
            ]
          }
        ]
      },
      {
        name: 'app',
        type: 'folder',
        description: 'Contains the main application structure and routing',
        children: [
          {
            name: '(auth)',
            type: 'folder',
            description: 'Groups authentication-related pages',
            children: [
              {
                name: 'error',
                type: 'folder',
                children: [{ name: 'page.tsx', type: 'file', description: 'Displays authentication errors' }]
              },
              {
                name: 'login',
                type: 'folder',
                children: [{ name: 'page.tsx', type: 'file', description: 'Login page component' }]
              },
              {
                name: 'new-verification',
                type: 'folder',
                children: [{ name: 'page.tsx', type: 'file', description: 'Email verification page' }]
              },
              {
                name: 'register',
                type: 'folder',
                children: [{ name: 'page.tsx', type: 'file', description: 'User registration page' }]
              }
            ]
          },
          {
            name: '(protected)',
            type: 'folder',
            description: 'Contains routes that require authentication',
            children: [
              {
                name: 'getting-started',
                type: 'folder',
                children: [{ name: 'page.tsx', type: 'file', description: 'Getting started guide for authenticated users' }]
              }
            ]
          },
          {
            name: 'api',
            type: 'folder',
            description: 'API routes',
            children: [
              {
                name: 'auth',
                type: 'folder',
                children: [
                  {
                    name: '[...nextAuth]',
                    type: 'folder',
                    children: [{ name: 'route.ts', type: 'file', description: 'NextAuth.js API route' }]
                  }
                ]
              }
            ]
          },
          { name: 'favicon.ico', type: 'file', description: 'Website favicon' },
          { name: 'globals.css', type: 'file', description: 'Global CSS styles' },
          { name: 'layout.tsx', type: 'file', description: 'Root layout component' },
          { name: 'page.tsx', type: 'file', description: 'Home page component' }
        ]
      },
      { name: 'auth.config.ts', type: 'file', description: 'NextAuth configuration' },
      { name: 'auth.ts', type: 'file', description: 'Authentication utility functions' },
      {
        name: 'components',
        type: 'folder',
        description: 'Reusable React components',
        children: [
          {
            name: 'Auth',
            type: 'folder',
            children: [
              {
                name: 'Login',
                type: 'folder',
                children: [
                  { name: 'LoginForm.tsx', type: 'file', description: 'Login form component' },
                  { name: 'ProviderLogIn.tsx', type: 'file', description: 'OAuth provider login buttons' },
                  { name: 'RegisterForm.tsx', type: 'file', description: 'User registration form' }
                ]
              },
              { name: 'NewVerificationForm.tsx', type: 'file', description: 'Email verification form' },
              {
                name: 'Register',
                type: 'folder',
                children: [{ name: 'ImageCropper.tsx', type: 'file', description: 'Profile picture upload and cropping component' }]
              },
              {
                name: 'Userbutton',
                type: 'folder',
                children: [
                  { name: 'Button.tsx', type: 'file', description: 'User account button component' },
                  { name: 'SettingsDialogue.tsx', type: 'file', description: 'User settings dialog' }
                ]
              }
            ]
          },
          {
            name: 'Global',
            type: 'folder',
            children: [
              { name: 'ErrorMessage.tsx', type: 'file', description: 'Global error message component' },
              { name: 'SuccessToast.tsx', type: 'file', description: 'Success notification toast component' }
            ]
          },
          {
            name: 'ui',
            type: 'folder',
            description: 'shadcn/ui components',
            children: [
              { name: 'accordion.tsx', type: 'file' },
              { name: 'alert-dialog.tsx', type: 'file' },
              { name: 'alert.tsx', type: 'file' },
              { name: 'aspect-ratio.tsx', type: 'file' },
              { name: 'avatar.tsx', type: 'file' },
              { name: 'badge.tsx', type: 'file' },
              { name: 'breadcrumb.tsx', type: 'file' },
              { name: 'button.tsx', type: 'file' },
              { name: 'calendar.tsx', type: 'file' },
              { name: 'card.tsx', type: 'file' },
              { name: 'carousel.tsx', type: 'file' },
              { name: 'chart.tsx', type: 'file' },
              { name: 'checkbox.tsx', type: 'file' },
              { name: 'collapsible.tsx', type: 'file' },
              { name: 'command.tsx', type: 'file' },
              { name: 'context-menu.tsx', type: 'file' },
              { name: 'dialog.tsx', type: 'file' },
              { name: 'drawer.tsx', type: 'file' },
              { name: 'dropdown-menu.tsx', type: 'file' },
              { name: 'form.tsx', type: 'file' },
              { name: 'hover-card.tsx', type: 'file' },
              { name: 'input-otp.tsx', type: 'file' },
              { name: 'input.tsx', type: 'file' },
              { name: 'label.tsx', type: 'file' },
              { name: 'menubar.tsx', type: 'file' },
              { name: 'navigation-menu.tsx', type: 'file' },
              { name: 'pagination.tsx', type: 'file' },
              { name: 'popover.tsx', type: 'file' },
              { name: 'progress.tsx', type: 'file' },
              { name: 'radio-group.tsx', type: 'file' },
              { name: 'resizable.tsx', type: 'file' },
              { name: 'scroll-area.tsx', type: 'file' },
              { name: 'select.tsx', type: 'file' },
              { name: 'separator.tsx', type: 'file' },
              { name: 'sheet.tsx', type: 'file' },
              { name: 'sidebar.tsx', type: 'file' },
              { name: 'skeleton.tsx', type: 'file' },
              { name: 'slider.tsx', type: 'file' },
              { name: 'sonner.tsx', type: 'file' },
              { name: 'switch.tsx', type: 'file' },
              { name: 'table.tsx', type: 'file' },
              { name: 'tabs.tsx', type: 'file' },
              { name: 'textarea.tsx', type: 'file' },
              { name: 'toast.tsx', type: 'file' },
              { name: 'toaster.tsx', type: 'file' },
              { name: 'toggle-group.tsx', type: 'file' },
              { name: 'toggle.tsx', type: 'file' },
              { name: 'tooltip.tsx', type: 'file' }
            ]
          }
        ]
      },
      {
        name: 'hooks',
        type: 'folder',
        description: 'Custom React hooks',
        children: [
          { name: 'use-mobile.tsx', type: 'file', description: 'Hook for detecting mobile devices' },
          { name: 'use-toast.ts', type: 'file', description: 'Hook for managing toast notifications' }
        ]
      },
      {
        name: 'lib',
        type: 'folder',
        description: 'Utility functions and libraries',
        children: [
          { name: 'cryptography.ts', type: 'file', description: 'Cryptography-related functions' },
          { name: 'db.ts', type: 'file', description: 'Database connection and operations' },
          { name: 'mail.ts', type: 'file', description: 'Email sending functionality' },
          {
            name: 'schema',
            type: 'folder',
            children: [
              { name: 'LoginSchema.ts', type: 'file', description: 'Login form validation schema' },
              { name: 'RegisterSchems.ts', type: 'file', description: 'Registration form validation schema' }
            ]
          },
          { name: 'token.ts', type: 'file', description: 'Token generation and validation' },
          { name: 'utils.ts', type: 'file', description: 'General utility functions' }
        ]
      },
      { name: 'middleware.ts', type: 'file', description: 'Next.js middleware for route protection' },
      { name: 'routes.ts', type: 'file', description: 'Application route definitions' },
      {
        name: 'types',
        type: 'folder',
        description: 'TypeScript type definitions',
        children: [{ name: 'next-auth.d.ts', type: 'file', description: 'NextAuth type declarations' }]
      }
    ]
  },
  { name: 'tailwind.config.ts', type: 'file', description: 'Tailwind CSS configuration' },
  { name: 'tsconfig.json', type: 'file', description: 'TypeScript configuration' }
]

function FileTree({ items }: { items: any[] }) {
  return (
    <ul className="space-y-1">
      {items.map((item, index) => (
        <li key={index}>
          <Collapsible>
            <CollapsibleTrigger className="flex items-center w-full hover:bg-accent hover:text-accent-foreground rounded-md p-1">
              {item.type === 'folder' ? (
                <FolderIcon className="mr-2 h-4 w-4 text-blue-500" />
              ) : (
                <FileIcon className="mr-2 h-4 w-4 text-gray-500" />
              )}
              {item.name}
              {item.type === 'folder' && <ChevronDown className="ml-auto h-4 w-4" />}
            </CollapsibleTrigger>
            <CollapsibleContent>
              {item.description && (
                <p className="text-sm text-muted-foreground ml-6 mb-2">{item.description}</p>
              )}
              {item.type === 'folder' && (
                <div className="ml-4">
                  <FileTree items={item.children} />
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        </li>
      ))}
    </ul>
  )
}

export default function Component() {
  const [activeSection, setActiveSection] = React.useState('overview')

  const sections = [
    { id: 'overview', title: 'Overview', icon: BookOpen },
    { id: 'features', title: 'Features', icon: Zap },
    { id: 'getting-started', title: 'Getting Started', icon: Rocket },
    { id: 'project-structure', title: 'Project Structure', icon: FolderTree },
    { id: 'authentication', title: 'Authentication', icon: Key },
    { id: 'file-upload', title: 'File Upload', icon: Upload },
    { id: 'ui-components', title: 'UI Components', icon: Palette },
  ]

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar className="w-64 border-r">
          <SidebarHeader  className="p-4">
            <h2 className="text-2xl font-bold text-primary">Next.js Starter Docs</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {sections.map((section) => (
                <SidebarMenuItem key={section.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(section.id)}
                    isActive={activeSection === section.id}
                    className="w-full justify-start"
                  >
                    <section.icon className="mr-2 h-4 w-4" />
                    {section.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex-1 overflow-auto">
          <ScrollArea className="h-full">
            <main className="p-6 space-y-8">
              {activeSection === 'overview' && (
                <section>
                  <h1 className="text-4xl font-bold mb-4 text-primary">Next.js Starter Repository</h1>
                  <p className="text-xl mb-6 text-muted-foreground">
                    Kickstart your web development project with this pre-configured Next.js starter. Featuring OAuth authentication, AWS S3 integration, and a complete set of ShadCN UI components.
                  </p>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Start</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Get up and running in minutes with our easy-to-follow setup guide.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Comprehensive Docs</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Detailed documentation to help you understand and customize every aspect of the starter.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Community Support</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Join our vibrant community for help, tips, and best practices.</p>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              )}
              {activeSection === 'features' && (
                <section>
                  <h2 className="text-3xl font-bold mb-6 text-primary">Features</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>NextAuth Integration</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Secure authentication with support for multiple OAuth providers.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>AWS S3 Integration</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Upload and manage profile pictures directly from your application.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>OAuth Sign-In</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Easily sign in with Google, GitHub, Twitter, and LinkedIn credentials.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>User Registration</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Simple user registration process for new users.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>ShadCN Components</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>All ShadCN components are included for a responsive and modern UI.</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>User Button</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>A convenient button for user actions, such as signing in and managing profiles.</p>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              )}
              {activeSection === 'getting-started' && (
                <section>
                  <h2 className="text-3xl font-bold mb-6 text-primary">Getting Started</h2>
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Prerequisites</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Node.js (v14 or later)</li>
                        <li>npm or yarn</li>
                        <li>An AWS account (for S3 configuration)</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Installation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="list-decimal list-inside space-y-4">
                        <li>
                          Clone the repository:
                          <pre className="bg-muted p-2 rounded-md mt-2 overflow-x-auto">
                            <code>
                              git clone https://github.com/yourusername/nextjs-starter-repo.git
                              cd nextjs-starter-repo
                            </code>
                          </pre>
                        </li>
                        <li>
                          Install dependencies:
                          <pre className="bg-muted p-2 rounded-md mt-2 overflow-x-auto">
                            <code>npm install</code>
                          </pre>
                          or
                          <pre className="bg-muted p-2 rounded-md mt-2 overflow-x-auto">
                            <code>yarn install</code>
                          </pre>
                        </li>
                        <li>Set up your environment variables (create a .env.local file)</li>
                        <li>
                          Run the development server:
                          <pre className="bg-muted p-2 rounded-md mt-2 overflow-x-auto">
                            <code>npm run dev</code>
                          </pre>
                          or
                          <pre className="bg-muted p-2 rounded-md mt-2 overflow-x-auto">
                            <code>yarn dev</code>
                          </pre>
                        </li>
                        <li>Open your browser and navigate to http://localhost:3000</li>
                      </ol>
                    </CardContent>
                  </Card>
                </section>
              )}
              {activeSection === 'project-structure' && (
                <section>
                  <h2 className="text-3xl font-bold mb-6 text-primary">Project Structure</h2>
                  <Card>
                    <CardContent className="pt-6">
                      <FileTree items={projectStructure} />
                    </CardContent>
                  </Card>
                </section>
              )}
              {activeSection === 'authentication' && (
                <section>
                  <h2 className="text-3xl font-bold mb-6 text-primary">Authentication</h2>
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>NextAuth.js Integration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">
                        This starter uses NextAuth.js for authentication. It supports multiple OAuth providers and includes a custom user registration process.
                      </p>
                      <h3 className="text-xl font-semibold mb-2">Key Files</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>src/app/api/auth/[...nextauth]/route.ts: NextAuth API route</li>
                        <li>src/auth.ts: NextAuth configuration</li>
                        <li>src/components/Auth/Login/LoginForm.tsx: Login form component</li>
                        <li>src/components/Auth/Login/ProviderLogIn.tsx: OAuth provider buttons</li>
                        <li>src/components/Auth/Register/RegisterForm.tsx: User registration form</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Authentication Flow</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="list-decimal list-inside space-y-2">
                        <li>User initiates login or registration process</li>
                        <li>NextAuth.js handles OAuth provider authentication or custom credentials</li>
                        <li>User session is created and managed by NextAuth.js</li>
                        <li>Protected routes are secured using Next.js middleware</li>
                      </ol>
                    </CardContent>
                  </Card>
                </section>
              )}
              {activeSection === 'file-upload' && (
                <section>
                  <h2 className="text-3xl font-bold mb-6 text-primary">File Upload</h2>
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>AWS S3 Integration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">
                        This starter includes functionality to upload profile pictures to AWS S3.
                      </p>
                      <h3 className="text-xl font-semibold mb-2">Key Files</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>src/actions/AWS/ProfilePicUpload.ts: Handles the upload process to S3</li>
                        <li>src/components/Auth/Register/ImageCropper.tsx: UI for cropping and uploading profile pictures</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Upload Process</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="list-decimal list-inside space-y-2">
                        <li>User selects an image for their profile picture</li>
                        <li>ImageCropper component allows user to crop and adjust the image</li>
                        <li>ProfilePicUpload action is called to handle the S3 upload</li>
                        <li>Uploaded image URL is saved to the user's profile</li>
                      </ol>
                    </CardContent>
                  </Card>
                </section>
              )}
              {activeSection === 'ui-components' && (
                <section>
                  <h2 className="text-3xl font-bold mb-6 text-primary">UI Components</h2>
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>ShadCN UI Components</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">
                        This starter includes a full set of UI components from ShadCN, located in src/components/ui/.
                        These components provide a solid foundation for building a modern, responsive user interface.
                      </p>
                    </CardContent>
                  </Card>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>Buttons</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button>Default Button</Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Inputs</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Enter text..." />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Cards</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>You're looking at a card right now!</p>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              )}
            </main>
          </ScrollArea>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}