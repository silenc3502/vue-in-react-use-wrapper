import React, { useEffect, useState } from 'react'

const VueCounterWrapper = () => {
    const [VueComponent, setVueComponent] = useState(null);

    useEffect(() => {
        import('vueCounterApp/CounterApp')
            .then((module) => {
                setVueComponent(module.default);
            })
            .catch((error) => {
                console.error('Failed to load Vue component:', error);
            });
    }, []);

    return (
        <div>
            {VueComponent ? (
                <div>
                    <VueComponent />
                </div>
            ) : (
                <div>Loading Vue component...</div>
            )}
        </div>
    );
};

export default VueCounterWrapper