using System.Linq;
using AutoMapper;
using DatingApp.API.DTO;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User,UserForListDTO>()
                .ForMember(dest => dest.PhotoUrl, 
                    opt => opt.MapFrom(src => src.Photos.FirstOrDefault( p => p.IsMain).Url))
                .ForMember(dest => dest.Age,opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
           
            CreateMap<User,UserForDetailedDTO>()
                .ForMember(dest => dest.PhotoUrl, 
                    opt => opt.MapFrom(src => src.Photos.FirstOrDefault( p => p.IsMain).Url))
                .ForMember(dest => dest.Age,opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            
            CreateMap<Photo,PhotosForDetailedDTO>();
            CreateMap<UserForUpdateDTO,User>();
            CreateMap<Photo,PhotoForReturnDTO>();
            CreateMap<PhotoForAddDTO,Photo>();
            CreateMap<UserForRegistrationDTO,User>();
            CreateMap<MessageForSendDTO,Message>().ReverseMap();
            CreateMap<Message,MessageToReturnDTO>()
                .ForMember(dest=>dest.SenderPhotoUrl, 
                    opt => opt.MapFrom(src=>src.Sender.Photos.FirstOrDefault(p=>p.IsMain).Url))
                .ForMember(dest=>dest.RecipientPhotoUrl, 
                    opt => opt.MapFrom(src=>src.Recipient.Photos.FirstOrDefault(p=>p.IsMain).Url));
        }
    }
}