import IOS26Button from "@/components/common/ui/IOS26Button";

export function OAuthButtons() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <IOS26Button variant="outline" className="flex items-center space-x-2">
                <span>GitHub</span>
            </IOS26Button>
            <IOS26Button variant="outline" className="flex items-center space-x-2">
                <span>Google</span>
            </IOS26Button>
        </div>
    );
}
