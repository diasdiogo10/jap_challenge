using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using JAPChallenge.Dtos;
using JAPChallenge.Models;

namespace JAPChallenge.Mappings
{
    public class ConfigurationMapping : Profile
    {
        public ConfigurationMapping()
        {
            CreateMap<Client, ClientDto>().ReverseMap();
            CreateMap<Vehicle, VehicleResponseDto>().ReverseMap();
            CreateMap<Vehicle, VehicleAddDto>().ReverseMap();
            CreateMap<Contract, ContractResponseDto>().ReverseMap();
            CreateMap<Contract, ContractAddDto>().ReverseMap();
        }
    }
}