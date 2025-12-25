import { Container } from "@/components/ui/Container";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black py-8">
            <Container className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} Alex Dev. All rights reserved.
                </p>
                <div className="flex gap-4">
                    {/* Social links will be added here */}
                    <span className="text-sm text-gray-600">Built with Next.js & AI</span>
                </div>
            </Container>
        </footer>
    );
}
