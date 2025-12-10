import PublicLayout from './(public)/layout';
import PublicPage from './(public)/page';

export default function RootPage() {
	return (
		<PublicLayout>
			<PublicPage />
		</PublicLayout>
	);
}
