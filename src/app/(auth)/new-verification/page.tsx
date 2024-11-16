import NewVerificationForm from '@/components/Auth/NewVerificationForm';
import React, { Suspense } from 'react';

const Page = () => {
	return (
		<div className="flex items-center justify-center min-h-full min-w-full">
		    <Suspense fallback={<div>Loading...</div>}>
				<NewVerificationForm />
		    </Suspense>
		</div>
	)
}

export default Page;